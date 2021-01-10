import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StudyMaterial.css';

import axios from 'axios';

class StudyMaterial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      optradio: 'assignments',
      url: ''
    }

  }

  componentDidMount() {
    axios.get('http://localhost:3001/StudyMaterial/upload')
            .then((response) => {
                // window.location.assign(response.data.authUrl);
                console.log(response);
                this.setState({url: response.data.authUrl});
            })
            .catch((err)=>{
                console.log(err);
            })
      
        //     axios.get('http://localhost:3001/google/callback')
        // .then((response) => {
        //   console.log(response)
        // })
        
    }

    handleClick = (e) => {
      
      
      window.location.assign(this.state.url);
    };
  

  

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
      // selectedOption: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.state);

    axios.post('http://localhost:3001/api/search', this.state)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error)
      })

  };

render() {
    const{searchString} = this.state
    return(
        <div>
            <h1>StudyMaterial</h1>
            <form onSubmit={this.handleSubmit} className="study-material" >
            <div className="study-material-search input-group md-form form-sm form-2 pl-0">
                <input value= {searchString} className="form-control my-0 py-1 lime-border" name="searchString" type="text" placeholder="Search" aria-label="Search" onChange={this.handleInputChange} />
                <button className="btn btn-success post-editor-button" type="submit">
                    Search
                </button>
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
            </form>
            {/* <UploadButton /> */}

            <button onClick={this.handleClick}> Upload </button>
            
        </div>
    );
}
} 

export default StudyMaterial;