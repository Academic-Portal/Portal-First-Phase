import React, {useState, useContext} from 'react';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

export default function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    
    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {

        try {
            e.preventDefault();
            const loginUser = {email, password};
            const loginRes = await Axios.post(
                "http://localhost:5000/users/login", loginUser);
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        } catch (err) {
            if(err.response.data.msg) {
                setError(err.response.data.msg);
            }
        }
    };

    return (
        <div className="page">
            {/* {error && 
                <ErrorNotice message={error} clearError={() => setError(undefined)}/>} */}
            <h2>Log in</h2>
            <form className="form" onSubmit={submit}>
                <label htmlFor="login-email">Email</label>
                <input 
                    id="login-email" 
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                />

                <label htmlFor="login-password">Password</label>
                <input 
                    id="login-password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}    
                />

                <input type="submit" value="Login" />
            </form>
        </div>
    )
}
