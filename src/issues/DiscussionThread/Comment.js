import React from 'react';
import './Comment.css';

const Issue = (props) => (
    <div className="panel panel-default post-body">
        <p className="user-name">name1</p>
        <div className="panel-body">
            {props.issueBody}
        </div>
    </div>
);

export default Issue;