import React, { Component } from 'react';
import "./DiscussionThread.css";
import { Button } from 'react-bootstrap';
import Issue from './Comment';
import NavBar from '../../NavBar';

class DiscussionThread extends Component {

    constructor(props) {
        super(props);

        this.addIssue= this.addIssue.bind(this);
        this.handleIssueEditorInputChange = this.handleIssueEditorInputChange.bind(this);

        this.state = {
            issues: [],
            newIssueBody: '',
        }
    }

    addIssue() {
        const newState = Object.assign({}, this.state);
        newState.issues.push(this.state.newIssueBody);
        newState.newIssueBody = '';
        this.setState(newState);
        this.setState({
            newIssueBody: '',
        })
    }

    handleIssueEditorInputChange(e) {
        this.setState({
            newIssueBody: e.target.value,
        })
    }
    

    render() {
        return (
            <div>

                <NavBar />

                <div className="return-button-div">
                    <Button variant="outlined" className="return-issues-button" href="/Issues">
                        Return to Issues
                    </Button>
                </div>
            

                <div className="dicussion-title">
                    
                    <h2>
                        {this.props.location.aboutProps.title}
                    </h2>
                </div>

                { 
                    this.state.issues.map((issueBody, idx) => {
                        return (
                            <Issue key={idx} issueBody={issueBody} />
                        )
                })
                }
                <div className="panel panel-default post-editor">
                    <div className="panel-body">
                        <textarea   className="form-control post-editor-input" 
                                    name="" id="" 
                                    cols="30" 
                                    rows="3"
                                    placeholder="Comments go here..."
                                    value={this.state.newIssueBody}
                                    onChange={this.handleIssueEditorInputChange}
                                    >
                        </textarea>
                        <button className="btn btn-success post-editor-button" 
                                onClick={this.addIssue}>
                            Post
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DiscussionThread;