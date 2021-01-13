import React, { Component } from 'react';

import {Redirect} from 'react-router-dom';

import axios from 'axios';

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
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
          )
        }

          return(
            <div>
                <div classname="jumbotron">
                <h1 classname="display-4"> Upload files </h1>
                </div>
                <div classname="panel-body container" >
                    <form onSubmit={this.handleSubmit} classname="form-horizontal">
                    <div classname="form-group">
                        <label for="icode" classname="col-md-3 control-label">File Name</label>
                         <div classname="col-md-9">
                        <input type="text" value={filename} onChange={this.handleInputChange} classname="form-control" name="filename" />
                        </div>
                </div>
                <div classname="form-group">
                <label for="icode" classname="col-md-3 control-label">Course No</label>
                <div classname="col-md-9">
                    <input type="text" value={courseno} onChange={this.handleInputChange} classname="form-control" name="courseno" />
                </div>
                </div>
                <div classname="form-group">
                <label for="icode" classname="col-md-3 control-label">Branch</label>
                <div classname="col-md-9">
                    <input type="text" value={branch} onChange={this.handleInputChange} classname="form-control" name="branch" />
                </div>
                </div>
                <div classname="form-group">
                <label for="icode" classname="col-md-3 control-label">Name</label>
                <div classname="col-md-9">
                    <input type="text" value={name} onChange={this.handleInputChange} classname="form-control" name="name" />
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
                <div classname="form-group">
                    <label for="icode" classname="col-md-3 control-label">File</label>
                    <div classname="col-md-9">
                    <input type="file" onChange={this.onFileChange} classname="form-control" name="file" accept="application/pdf" />
                </div>
                </div>
                
                <button type="submit">Submit</button>
                </form>
                </div>
            </div>
          );
      }
}


export default UploadMetadata;