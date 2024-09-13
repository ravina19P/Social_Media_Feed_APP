import React, { useEffect } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faReddit } from '@fortawesome/free-brands-svg-icons';
import { faHome, faBriefcase, faMessage, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate,Navigate  } from 'react-router-dom';
import { LOGOUT_DATA } from '../../Redux/react-redux/constant';

const Navbar = () => {
    const isAuthenticated = useSelector(state => state.reducers.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && window.location.pathname === '/LogIn') {
            navigate('/Home');
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('auth'); 
    dispatch({
        type: LOGOUT_DATA, 
    });
    navigate('/LogIn');        
    };

    if (isAuthenticated && window.location.pathname === '/LogIn') {
        return <Navigate to="/Home" />;
    }    
    return (
        <div>
            <nav className={`navbar navbar-expand-lg ${styles.navbody}`}>
                <Link className="navbar-brand" to="/"><FontAwesomeIcon icon={faReddit} className={styles.icon} /></Link>
                <button className={`navbar-toggler ${styles.toggler}`} type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="d-flex">
                    <div className="input-group" style={{ width: '300px' }}>
                        <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: '#edf3f8', border: '1px solid black' }}>
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input
                            className="form-control custom-placeholder"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            style={{
                                backgroundColor: '#edf3f8',
                                color: 'whitesmoke',
                                border: '1px solid black'
                            }}
                        />
                    </div>
                </div>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                {isAuthenticated && ( 
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/Home"><FontAwesomeIcon icon={faHome} className={styles.navicon} /></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#"><FontAwesomeIcon icon={faBriefcase} className={styles.navicon} /></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#"><FontAwesomeIcon icon={faMessage} className={styles.navicon} /></Link>
                            </li>
                        </ul>
                    )}
                </div>
                <div>
                    <ul className="navbar-nav">
                        {!isAuthenticated ? (
                            <li className="nav-item active">
                                <Link className="nav-link" to="/LogIn"><button className={`btn ${styles.NavBtn}`}> Sign in </button></Link>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <button className={`btn mx-3 ${styles.NavBtn2}`} onClick={handleLogout}> Sign out </button>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
