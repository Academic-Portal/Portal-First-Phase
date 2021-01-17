import React, { useState } from "react";
import {Navbar} from 'react-bootstrap';
import TransitionBox from 'react-transition-box';
import './login_page.css';
import SignUp from './sign_up';
import SignIn from './sign_in'

function LoginPage() {  
    const [index,setIndex] = useState(1);
    
    return (
        // <div className = "main-body">
        //     <TransitionBox duration={500}   >
        //         {index?<SignIn setIndex={setIndex} index={index}/>:<SignUp setIndex = {setIndex} index = {index}/>}
        //     </TransitionBox>
        // </div>
        <div className = "cross">
        <div className = "main-body">
            <TransitionBox duration={500}   >
                {!index?<SignIn setIndex={setIndex} index={index}/>:<SignUp setIndex = {setIndex} index = {index}/>}
            </TransitionBox>
        </div>        
        </div>
    );
}

export default LoginPage;