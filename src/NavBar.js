import React, {useState} from "react";
import { GoogleLogout } from 'react-google-login';
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import {useHistory, Link} from 'react-router-dom';
import './NavBar.css';

function NavBar() {

    const [ userData, setUserData ] = useState(JSON.parse(localStorage.getItem('profile')));

    const history = useHistory();

    const register = () => {
        history.push("/register");
    }

    const login = () => {
        history.push("/login");
    }

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem('profile', JSON.stringify({token: undefined, user: undefined})); 

        history.push("/login");
    }

    return (
    <div>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Academic Portal IITT</Navbar.Brand>
                <Nav className="mr-auto">
                    <Link to="/" className="nav-links">Home</Link>
                    <Link to="/Issues" className="nav-links">Issues</Link>
                    <Link to="/StudyMaterial" className="nav-links">study material</Link>
                    {
                        userData.user ?
                        <GoogleLogout
                        clientId="753929392522-t7al8gi7q8knpp3s8pdb40d556ni54qq.apps.googleusercontent.com"
                        buttonText="Logout"
                        onLogoutSuccess={logout}
                        >
                        </GoogleLogout> :
                        <>
                        </>
                    }


                </Nav>
        </Navbar>
    </div>
    );
}

export default NavBar;
