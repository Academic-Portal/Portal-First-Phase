import React, {useState} from 'react';
import './IssueCard.css';
import DeleteIcon from '@material-ui/icons/Delete';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Link } from 'react-router-dom';

import apis from '../service/index';


function IssueCard(props) {

    const [ userData, setUserData ] = useState(JSON.parse(localStorage.getItem('profile')));

    const deleteIssue = async () => {
        if(!window.confirm("you sure?"))
            return null;
        const deleteIssue = await apis.removeIssue(props.id);
    }

    return (
        <div>
            
            <div className="issueCard__box">
                <ErrorOutlineIcon fontSize="small" htmlColor="#22863a"/>
                <div>
                    <Link to={{
                        pathname: `/discussionThread`,
                        state: {
                            title: props.title,
                            id: props.id,
                            name: props.name,
                            issueDescription: props.body,
                        },
                    }}>{props.title}</Link>

                    <p>{props.body}</p>
                    <p className="issueCard__text">{`#Opened by ${ props.name } at ${props.createdAt}`}</p>
                </div>
                {
                    (userData.user.displayName === props.name)  ? 
                        <div className="delete-icon" onClick={deleteIssue}><DeleteIcon/></div> :

                        <div></div>
                }
            </div>
        </div>
    )
}

export default IssueCard