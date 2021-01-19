import React, { useEffect, useContext, useState } from 'react'
import './Issues.css'
import IssueCard from './IssueCard.js';

import api from '../service/index';

// authuntication
import {useHistory} from 'react-router-dom';
import UserContext from '../context/UserContext';



export default function Issues() {

    const [issues, setIssues] = useState([{}]);
    const [newIssueTitle, setNewIssueTitle] = useState('');
    const [newIssueBody, setNewIssueBody] = useState('');


    const {userData} = useContext(UserContext);
    const history = useHistory();

    async function fetchData () {

        await api.getAllIssues().then(allIssues => {
            setIssues(allIssues.data);
        });

    }


    async function postData () {
        var newIssue = {
            title: newIssueTitle,
            user: userData.user.displayName,
            body: newIssueBody,
        }

        setNewIssueTitle('');
        setNewIssueBody('');

        await api.insertIssue(newIssue);

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
                        <h1>Issues</h1>
                    </div>

                    <div className="issueCard__list">
                        {
                            issues.map((issue, idx) => {
                                return(
                                    <IssueCard id={issue._id} title={issue.title} body={issue.body} name={issue.user} createdAt={issue.createdAt}/>
                                );
                            })
                        }
                    </div>

                <div className="panel panel-default post-editor">
                    <div className="panel-body">
                            <textarea   className="form-control post-editor-input" 
                                        name="" id="" 
                                        cols="30" 
                                        rows="1"
                                        placeholder='title of the issue goes here...'
                                        value={newIssueTitle}
                                        onChange={e => {
                                            setNewIssueTitle(e.target.value);
                                        }}
                                        >
                            </textarea>
                            <textarea   className="form-control post-editor-input" 
                                        name="" id="" 
                                        cols="30" 
                                        rows="3"
                                        placeholder='body of issue goes here...'
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
