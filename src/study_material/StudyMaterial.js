import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './StudyMaterial.css';
import './Trial.css';
import {Redirect} from 'react-router-dom';
import TableHeader from './TableHeader';
import UserContext from '../context/UserContext'


import axios from 'axios';

function createCard(props)
{
  return(
    <table>
    <tr>
    <td className="table1">{props.filename}</td>
    <td className="table2">{props.branch}</td>
    <td className="table3">{props.courseno}</td>
    <td className="table4">{props.name}</td>
    <td className="table5"><a href={props.link}>here</a></td>
    </tr>
    </table>
  )
}

function show(props)
{
   return(props.map(createCard));
}

class StudyMaterial extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      optradio: 'assignments',
      redirect: false,
      tableInfo:[],
      loggedIn: true
    }

  }
  static contextType = UserContext
    componentDidMount(){
      const userData = this.context;
      if(!userData.userData.user){
        this.setState({loggedIn: false})
      }
      else{
        this.setState({loggedIn: true})
      }
    }

    handleClick = (e) => {
      axios.get('http://localhost:3001/api/StudyMaterial/upload')
            .then((response) => {
                // window.location.assign(response.data.authUrl);
                console.log(response);
                // this.setState({url: response.data.authUrl});
                if(response.data.authDone == 0){
                  window.location.assign(response.data.authUrl);
                }
                else if(response.data.authDone == 1){
                  // console.log(response);
                  this.setState({redirect: true})
                }
                
            })
            .catch((err)=>{
                console.log(err);
            })
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
        // console.log(response.data);
        this.setState({
          tableInfo:response.data
        });
      })
      .catch(error => {
        console.log(error)
      })

  };

render() {
    const{redirect, searchString, tableInfo, loggedIn} = this.state

    if(redirect){
      return <Redirect to ='/UploadMetadata' />;
    }

    if(!loggedIn){
      return <Redirect to ='/login' />;
    }

    return(
        <div>
              <h2 style={{textAlign:'center'}}>StudyMaterial</h2>

              <form onSubmit={this.handleSubmit} className="study-material" >
                
                <div className=" sn1 study-material-search input-group md-form form-sm form-2 pl-0">
                  
                  <input value= {searchString} className=" sn11 form-control my-0 py-1 lime-border" name="searchString" type="text" placeholder="Search" aria-label="Search" onChange={this.handleInputChange} />
                  <button className=" sn12"/*  btn btn-success post-editor-button"*/ type="submit">Search</button>
                </div>
              
                <div className="radio radiobtn">
                <label ><input value="assignments" name="optradio"
                // checked={this.state.selectedOption === "Option1"}
                onChange={this.handleInputChange}  type="radio" defaultChecked  />Assignments</label>
                <br/>
                <label ><input value="notes"
                name="optradio"
                // checked={this.state.selectedOption === "Option2"}
                onChange={this.handleInputChange} type="radio"  />Notes</label>
                <br/>
                <label ><input value="coursematerial"
                name="optradio"
                // checked={this.state.selectedOption === "Option3"}
                onChange={this.handleInputChange} type="radio"  />Course Material</label>
                </div>
            </form>
            {/* <UploadButton /> */}

            <button className="Uploadbtn" onClick={this.handleClick}> Upload </button>

            <div>
              <TableHeader/>
              {show(tableInfo)}
            </div> 
        </div>
    );
}
} 

export default StudyMaterial;