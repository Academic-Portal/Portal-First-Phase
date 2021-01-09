import React, { Component, useEffect, useContext, useState } from 'react'
import './Issues.css'
import IssueCard from './IssueCard.js';
import { Button } from '@material-ui/core';
import Issue from './DiscussionThread/Comment';

// authuntication
import {useHistory} from 'react-router-dom';
import UserContext from '../context/UserContext';



export default function Issues() {

    const [issues, setIssues] = useState([]);
    const [newIssueBody, setNewIssueBody] = useState('');

    const {userData} = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if(!userData.user) {
            history.push("/login");
        }
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
                            issues.map((issue) => {
                                return(
                                    <IssueCard title={issue}/>
                                );
                            })
                        }
                    </div>

                <div className="panel panel-default post-editor">
                    <div className="panel-body">
                            <textarea   className="form-control post-editor-input" 
                                        name="" id="" 
                                        cols="30" 
                                        rows="3"
                                        placeholder='please post your issue here...'
                                        onChange={e => {
                                            setNewIssueBody(e.target.value);
                                        }}
                                        >
                            </textarea>
                            <button className="btn btn-success post-editor-button" 
                                    onClick={e => {
                                        setIssues([...issues, newIssueBody]);
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
