import React, { useEffect, useState } from 'react';
import { GettData } from '../../Other/common';
import { useDispatch, useSelector } from 'react-redux';
import { storeHomeData, storeLikeData, storeUnLikeData } from '../../Redux/react-redux/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faThumbsUp, faThumbsDown, faComment, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const globaldata = useSelector(state => state.reducers);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [likedPosts, setLikedPosts] = useState([]);
    const [unlikedPosts, setUnlikedPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [postComments, setPostComments] = useState({});
    const [postLikeCounts, setPostLikeCounts] = useState({});
    const [postUnLikeCounts, setPostUnLikeCounts] = useState({});
    const [bookmarkedPosts, setBookmarkedPosts] = useState([]);


    useEffect(() => {
        GettData().then((data) => {
            dispatch(storeHomeData(data.children));

            const savedLikeCounts = JSON.parse(localStorage.getItem('postLikeCounts')) || {};
            setPostLikeCounts(savedLikeCounts);
            const savedUnLikeCounts = JSON.parse(localStorage.getItem('postUnLikeCounts')) || {};
            setPostUnLikeCounts(savedUnLikeCounts);
        });

        const savedLikedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
        const savedUnlikedPosts = JSON.parse(localStorage.getItem('unlikedPosts')) || [];
        const savedPostComments = JSON.parse(localStorage.getItem('postComments')) || {};

        setLikedPosts(savedLikedPosts);
        setUnlikedPosts(savedUnlikedPosts);
        setPostComments(savedPostComments);

        const savedBookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts')) || [];
        setBookmarkedPosts(savedBookmarkedPosts);
    }, [dispatch]);

    const handleLike = (postId) => {
        if (unlikedPosts.includes(postId)) {
            const updatedUnlikedPosts = unlikedPosts.filter(id => id !== postId);
            setUnlikedPosts(updatedUnlikedPosts);
            localStorage.setItem('unlikedPosts', JSON.stringify(updatedUnlikedPosts));
        }

        const updatedLikedPosts = likedPosts.includes(postId)
            ? likedPosts.filter(id => id !== postId)
            : [...likedPosts, postId];

        setLikedPosts(updatedLikedPosts);
        dispatch(storeLikeData({ postId }));
        localStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts));

        const updatedLikeCounts = {
            ...postLikeCounts,
            [postId]: (postLikeCounts[postId] || 0) + (likedPosts.includes(postId) ? -1 : 1)
        };

        setPostLikeCounts(updatedLikeCounts);
        localStorage.setItem('postLikeCounts', JSON.stringify(updatedLikeCounts));
    };

    const handleUnLike = (postId) => {
        if (likedPosts.includes(postId)) {
            const updatedLikedPosts = likedPosts.filter(id => id !== postId);
            setLikedPosts(updatedLikedPosts);
            localStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts));
        }

        const updatedUnlikedPosts = unlikedPosts.includes(postId)
            ? unlikedPosts.filter(id => id !== postId)
            : [...unlikedPosts, postId];

        setUnlikedPosts(updatedUnlikedPosts);
        dispatch(storeUnLikeData({ postId }));
        localStorage.setItem('unlikedPosts', JSON.stringify(updatedUnlikedPosts));

        const updatedUnLikeCounts = {
            ...postUnLikeCounts,
            [postId]: (postUnLikeCounts[postId] || 0) + (unlikedPosts.includes(postId) ? -1 : 1)
        };

        setPostUnLikeCounts(updatedUnLikeCounts);
        localStorage.setItem('postUnLikeCounts', JSON.stringify(updatedUnLikeCounts));
    };

    const OpenPost = (post) => {
        navigate(`/detail?id=${post.postId}`, { state: post });
    };

    const formatDate = (Timestamp) => {
        const date = new Date(Timestamp * 1000);
        return date.toLocaleString();
    };

    const handleCommentChange = (e, postId) => {
        setComments(prevComments => ({
            ...prevComments,
            [postId]: e.target.value
        }));
    };

    const onSubmitComment = (postId) => {
        const updatedComments = {
            ...postComments,
            [postId]: [...(postComments[postId] || []), comments[postId]]
        };

        setPostComments(updatedComments);
        setComments(prevComments => ({
            ...prevComments,
            [postId]: ''
        }));

        localStorage.setItem('postComments', JSON.stringify(updatedComments));
    };
    const handleBookmark = (postId) => {
        const updatedBookmarkedPosts = bookmarkedPosts.includes(postId)
            ? bookmarkedPosts.filter(id => id !== postId)
            : [...bookmarkedPosts, postId];

        setBookmarkedPosts(updatedBookmarkedPosts);
        localStorage.setItem('bookmarkedPosts', JSON.stringify(updatedBookmarkedPosts));
    };

    return (
        <div style={{ backgroundColor: 'rgb(239, 239, 236)' }}>
            <div className='container'>
                {globaldata.homeData.length > 0 && globaldata.homeData.map((item, index) => {
                    const postId = item.data.id;
                    const isLiked = likedPosts.includes(postId);
                    const isUnLiked = unlikedPosts.includes(postId);
                    return (
                        <div className="card text-start mb-4" key={index} style={{width: '80%',marginLeft: 'auto',marginRight: 'auto',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}}>
                            <div className="card-header">
                                <FontAwesomeIcon icon={faUser} style={{ color: '#ff5500', fontSize: '30px', marginRight: '15px' }} />
                                {item.data.author}
                            </div>
                            <div className="card-body" style={{ cursor: 'pointer' }} onClick={() => OpenPost(item)}>
                                <h5 className="card-title">{item.data.title}</h5>
                                <p className="text-muted">Posted on: {formatDate(item.data.created_utc)}</p>
                                <p className="card-text">{item.data.selftext}</p>
                            </div>
                            <div className="card-footer text-muted">
                                <FontAwesomeIcon icon={faThumbsUp} style={{ marginRight: '10px', color: isLiked ? '#ff5500' : 'grey', cursor: 'pointer' }} onClick={() => handleLike(postId)} /> <span className='mx-2'>{postLikeCounts[postId] || 0}</span>

                                <FontAwesomeIcon icon={faThumbsDown} style={{ marginRight: '10px', color: isUnLiked ? '#ff5500' : 'grey', cursor: 'pointer' }} onClick={() => handleUnLike(postId)} />
                                <span className='mx-2'>{postUnLikeCounts[postId] || 0}</span>
                                <FontAwesomeIcon icon={faComment} />
                                <FontAwesomeIcon icon={faBookmark} style={{ position: 'absolute', right: '30px', cursor: 'pointer', color: bookmarkedPosts.includes(postId) ? '#ff5500' : 'grey' }} onClick={() => handleBookmark(postId)} />
                                <div>
                                    <textarea
                                        className="form-control"
                                        rows="1"
                                        placeholder='Add a comment'
                                        value={comments[postId] || ''}
                                        onChange={(e) => handleCommentChange(e, postId)}
                                    />
                                    {comments[postId] && comments[postId].trim() && (
                                        <button className="btn btn-warning mt-2" style={{ display: 'block' }} onClick={() => onSubmitComment(postId)}>
                                            Comment
                                        </button>
                                    )}
                                    <div className="comments-section mt-3">
                                        {postComments[postId] && postComments[postId].slice(0, 5).map((comment, i) => (
                                            <div key={i} className="comment">
                                                <p>{comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    );
};

export default Home;
