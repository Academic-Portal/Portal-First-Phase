import React, {useContext} from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import {useHistory} from 'react-router-dom';

import UserContext from './context/UserContext';

function NavBar() {

    const {userData, setUserData} = useContext(UserContext);
    
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
        localStorage.setItem("auth-token", "");
    }

    return (
    <div>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/Home">Academic Portal IITT</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/Home">Home</Nav.Link>
                    <Nav.Link href="/Issues">Issues</Nav.Link>
                    <Nav.Link href="/StudyMaterial">study material</Nav.Link>
                    {
                        userData.user ?
                        <Button onClick={logout}>Logout</Button> :
                        <>
                            <Button onClick={register}>Register</Button>
                            <Button onClick={login}>Login</Button> 
                        </>
                    }
                    

                </Nav>
        </Navbar>
    </div>
    );
}

export default NavBar;


    
//     return (
//         <nav className="auth-options">
//             {
//                 userData.user ?
//                 <button onClick={logout}>Logout</button> :
//                 <>
//                     <button onClick={register}>Register</button>
//                     <button onClick={login}>Login</button> 
//                 </>
//             }
//         </nav>
//     )
