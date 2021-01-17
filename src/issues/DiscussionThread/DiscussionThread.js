import React, { useEffect, useContext, useState } from 'react'
import '../Issues.css';
import IssueCard from './Comment.js';

import api from '../../service/index';

// authuntication
import {useHistory, useLocation, useParams} from 'react-router-dom';
import UserContext from '../../context/UserContext';



export default function Issues() {

    const [issues, setIssues] = useState([{}]);
    const [newIssueBody, setNewIssueBody] = useState('');


    const {userData} = useContext(UserContext);
    
    const history = useHistory();
    const location = useLocation();


    const { title, id, issueDescription } = location.state;

    async function fetchData () {

        await api.getCommentsOfIssue(id).then(allIssues => {
            setIssues(allIssues.data);
        });

    }


    async function postData () {
        var newIssue = {
            issueId: id,
            user: userData.user.displayName,
            body: newIssueBody,
        }

        setNewIssueBody('');

        await api.insertCommentOfIssue(id, newIssue);

    }

    useEffect(() => {

        if(!userData.user) {
            history.push("/login");
        }

        fetchData();
    });


    return (
        <div>
            <div>
                <div className="issues">
                    <div className="issues__title">
                        <h1>{ title } :</h1>
                    </div>

                    <h3>{ issueDescription }</h3>

                    <div className="issueCard__list">
                        {   
                        issues ?
                            issues.map((issue, idx) => {
                                return(
                                    <IssueCard id={issue._id} title={issue.title} body={issue.body} name={issue.user} createdAt={issue.createdAt}/>
                                );
                            }) 
                            
                            :
                            
                            <h3>No comments</h3>
                        }
                    </div>

                <div className="panel panel-default post-editor">
                    <div className="panel-body">
                            <textarea   className="form-control post-editor-input" 
                                        name="" id="" 
                                        cols="30" 
                                        rows="3"
                                        placeholder='comment for issue goes here...'
                                        value={newIssueBody}
                                        onChange={e => {
                                            setNewIssueBody(e.target.value);
                                        }}
                                        >
                            </textarea>
                            <button className="btn btn-success post-editor-button" 
                                    onClick={e => {
                                        postData();
                                    }}>
                                Post
                            </button>
                    </div>
        
                    </div>
                </div>

            </div>
        );
        </div>
    );
}
