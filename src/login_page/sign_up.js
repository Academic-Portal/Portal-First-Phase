import React from "react";

import './login_page.css';

export default function SignUp(props){
    return (
        <div className = "auth-wrapper">
            <div className= "auth-inner">
                <form>
                    <h4>Sign Up</h4>
                    <hr></hr>
                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder="First name" />
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" />
                        <hr></hr>
                        <label>Email address</label>
                        <div className="input-group mb-1">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">@</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                        <label>Password</label>
                        <div className="input-group mb-1">
                        <div className="input-group-prepend"> 
                            <span className="input-group-text"  id="basic-addon1">#</span>
                        </div>
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered <a href="#" onClick = {() => {props.setIndex(0); console.log(props.index)}}>sign in?</a>
                    </p>
                </form>
            </div>
        </div>
    );
}