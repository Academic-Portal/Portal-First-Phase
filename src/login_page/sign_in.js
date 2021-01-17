import React from "react";

import './login_page.css';
function SignIn(props){

    return (
    <div className = "auth-wrapper">
        <div className= "auth-inner">
            <form>
                <h4>Sign In</h4>
                <hr></hr>
                <div className="form-group">
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

                {/* <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div> */}

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="text-right">
                    Forgot <a href="#">password?</a><br></br>
                    New here? <a href="#" onClick = {() => {props.setIndex(1); console.log(props.index)}}   >Sign up</a>
                </p>
                <div className="or-container">
                        <div className="line-separator"></div>
                        <div className="or-label">Or</div>
                        <div className="line-separator"></div>
                </div>
                <button type="submit" className="btn btn-light btn-block btn-google"><img src="https://img.icons8.com/color/16/000000/google-logo.png"></img> SignIn Using Google</button>
            </form>
        </div>  
    </div>
    );
}

export default SignIn;