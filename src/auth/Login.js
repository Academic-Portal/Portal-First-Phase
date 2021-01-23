import React, {useState} from 'react';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';

import './login_page.css';

export default function Login() {


    const history = useHistory();

    const responseGoogle = async (e) => {

        const token = e.tokenId;
        const user = {
            email: e.profileObj.email,
            displayName: e.profileObj.name,
        }


        await localStorage.setItem('profile', JSON.stringify({token: token, user: user}));

        history.push("/");
    }
    
    return (
        <div className = "auth-wrapper">
            <div className= "auth-inner">
                    <h4>IITTP Acad Portal</h4>
                    <hr></hr>
                    
                    <div className="login-button">
                    <GoogleLogin
                    clientId="753929392522-t7al8gi7q8knpp3s8pdb40d556ni54qq.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    isSignedIn={true}
                    cookiePolicy={'single_host_origin'}
                    />
            </div>
            </div>  
        </div>
        );
}
