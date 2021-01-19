import React, {useContext} from 'react';
import GoogleLogin from 'react-google-login';
import UserContext from '../context/UserContext';

export default function Login() {

    const {userData, setUserData} = useContext(UserContext);

    const responseGoogle = (e) => {
        
        setUserData(userData => ({ 
            ...userData,      
            token: e.profileObj.googleId,
            user: {
                email: e.profileObj.email,
                displayName: e.profileObj.name,
            }
        }));

        console.log(userData);
    }

    return (
        <div className="page">
            <GoogleLogin
            clientId="753929392522-t7al8gi7q8knpp3s8pdb40d556ni54qq.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            isSignedIn={true}
            cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}
