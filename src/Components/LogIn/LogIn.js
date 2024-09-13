import React, {useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { storeLogData } from '../../Redux/react-redux/action';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    const globaldata = useSelector(state => state.reducers)
    console.log(globaldata)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [info, setInfo] = useState({ userName: '', userPassword: '' })
    const [error, setError] = useState([]);
    const validCredentials = { userName: 'user', userPassword: 'password' };
  
    const HandleError = (value) => {
        return error.indexOf(value) > -1 ? true : false;
    }
    const submitHandle = (event) => {
        event.preventDefault();
        setError([]);
        if (info.userName === validCredentials.userName && info.userPassword === validCredentials.userPassword) {
            const userData = { userName: info.userName, isAuthenticated: true };
            localStorage.setItem('auth', JSON.stringify(userData));
            dispatch(storeLogData({ data: userData }));
            alert("Login successful!");
            navigate('/Home'); 
        } else {
            setError(['userName', 'userPassword']);
            alert("Invalid credentials!");
        }
    };
    const OnchangeHandle = (event, fieldname) => {
        setInfo((prevstate) => ({ ...prevstate, [fieldname]: event.target.value }))
    }
    return (
        <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '80vh', backgroundColor:'rgb(239 239 236)' }}>
            <div className='row col-md-5 border p-4 border-black' style={{ backgroundColor: '#ff5500', color: '#fff ' }}>
                <form className='mt-3' onSubmit={(e) => submitHandle(e)}>
                    <h3>Log-In</h3>
                    <div className="form-group">
                        <label>UserName</label>
                        <input type="text" value={info.userName} onChange={(e) => OnchangeHandle(e, 'userName')} className={HandleError("userName") ? "form-control is-invalid mt-2" : "form-control mt-2"} id="exampleuserName" placeholder="Enter userName" />
                        {HandleError("userName") && <div className= "invalid-feedback">
                            Please choose a userName.
                        </div>}
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input type="password" value={info.userPassword} onChange={(e) => OnchangeHandle(e, 'userPassword')} className={HandleError("userPassword") ? "form-control is-invalid mt-2" : "form-control mt-2"} id="exampleInputPassword1" placeholder="Password" />
                        {HandleError("userPassword") && <div className= "invalid-feedback">
                            Please choose a userPassword.
                        </div>}
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default LogIn;