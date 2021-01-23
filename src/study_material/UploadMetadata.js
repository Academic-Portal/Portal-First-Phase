import React, { Component } from 'react';

import {Redirect} from 'react-router-dom';

import axios from 'axios';
import './UploadStyles.css';
import Navbar from '../NavBar';

class UploadMetadata extends Component {
    constructor(props) {
        super(props);

        
    
        this.state = {
            filename: '',
            courseno: '',
            branch: '',
            name: '',
            optradio: 'assignments',
            selectedfile: null,
            redirect: false,
            redirectIfnotAuthed: false,
            loading: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount(){
        axios.get("http://localhost:3001/api/StudyMaterial/upload")
          .then((response) =>{
            if(response.data.authDone == 0){
              this.setState({redirectIfnotAuthed: true});
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }

      
    
      handleSubmit = (e) => {
        e.preventDefault();

        let currentComponent = this;

        this.setState({ loading: true });

        var formData = new FormData();
        
        formData.append('file', this.state.selectedfile);
        formData.append('filename', this.state.filename);
        formData.append('courseno', this.state.courseno);
        formData.append('branch', this.state.branch);
        formData.append('name', this.state.name);
        formData.append('optradio', this.state.optradio);

        axios({
            method: 'post',
            url: 'http://localhost:3001/api/uploadMetadata',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data',
         }
            })
            .then(function (response) {
                //handle success
                if(response.data.UploadDone == 1){
                    currentComponent.setState({ redirect: true })
                }
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });


      }

      onFileChange = e =>{
          this.setState({selectedfile: e.target.files[0]})
      }

      handleInputChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
          // selectedOption: e.target.value
        });
      };

      render(){
        const{filename, courseno, branch, name, redirect, redirectIfnotAuthed, loading} = this.state
        
        if(redirectIfnotAuthed){
          return <Redirect to ='/StudyMaterial' />;
        }

        if(redirect){
            return <Redirect to ='/StudyMaterial' />;
        }

        if(loading){
          return (
            <div>
            <Navbar />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
            </div>
          )
        }

          return(
            <div>
              <Navbar />
                <div className="jumbotron">
                <h1 className="display-4"> Upload files </h1>
                </div>
                <div className="panel-body container" >
                    <form onSubmit={this.handleSubmit} className="form-horizontal">
                    <div className="form-group">
                        <label for="icode" className="col-md-3 control-label">File Name</label>
                         <div className="col-md-9">
                        <input type="text" value={filename} onChange={this.handleInputChange} className="form-control" name="filename" />
                        </div>
                </div>
                <div className="form-group">
                <label for="icode" className="col-md-3 control-label">Course No</label>
                <div className="col-md-9">
                    <input type="text" value={courseno} onChange={this.handleInputChange} className="form-control" name="courseno" />
                </div>
                </div>
                <div className="form-group">
                <label for="icode" className="col-md-3 control-label">Branch</label>
                <div className="col-md-9">
                    <input type="text" value={branch} onChange={this.handleInputChange} className="form-control" name="branch" />
                </div>
                </div>
                <div className="form-group">
                <label for="icode" className="col-md-3 control-label">Name</label>
                <div className="col-md-9">
                    <input type="text" value={name} onChange={this.handleInputChange} className="form-control" name="name" />
                </div>
                </div>
                <div className="radio radiobtn">
            <label ><input value="assignments"
            name="optradio"
              // checked={this.state.selectedOption === "Option1"}
              onChange={this.handleInputChange}  type="radio" defaultChecked  />Assignments</label>
            <label ><input value="notes"
            name="optradio"
              // checked={this.state.selectedOption === "Option2"}
              onChange={this.handleInputChange} type="radio"  />Notes</label>
            <label ><input value="coursematerial"
            name="optradio"
              // checked={this.state.selectedOption === "Option3"}
              onChange={this.handleInputChange} type="radio"  />Course Material</label>
            </div>
                <div className="form-group">
                    <label for="icode" className="col-md-3 control-label">File</label>
                    <div className="col-md-9">
                    <input type="file" onChange={this.onFileChange} className="form-control" name="file" accept="application/pdf" />
                </div>
                </div>
                
                <button type="submit" className="Submitbtn">Submit</button>
                </form>
                </div>
            </div>
          );
      }
}


export default UploadMetadata;