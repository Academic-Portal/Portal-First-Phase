import React, { Component } from 'react';

import {Redirect} from 'react-router-dom';

import axios from 'axios';

class GoogleCallback extends Component {
  constructor(props) {
    super(props);

    this.state = {
        message: "Authenticating User.... Directing You to Upload Page",
        redirect: false
    }

  }

  componentDidMount() {

    var code = (window.location.href)
    var ind = code.lastIndexOf('scope');
    var code1 = code.substring(42,ind-1);
    
    if(ind != -1){
    axios.post('http://localhost:3001/api/googleCallback', {
        data: {
            "code": code1
        }
        })
        .then((response) => {
                // console.log(response);
                // console.log(this)
                if(response.data.authDone == 1){
                    this.setState({redirect: true})
                    // console.log(this)
                }
                else{
                    this.setState({message: "Error 404"})
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        else{
            this.setState({message: "Error 404"})
        }
        
    }

render() {

    const {redirect} = this.state;

    if(redirect){
        return <Redirect to ='/UploadMetadata' />;
    }
    
    return(
        <div>
            <h1> {this.state.message} </h1>
        </div>
    );
}
} 

export default GoogleCallback;