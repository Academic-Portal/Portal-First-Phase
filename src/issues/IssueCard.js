import React, {useEffect, useContext} from 'react';
import './IssueCard.css';
import DeleteIcon from '@material-ui/icons/Delete';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Link } from 'react-router-dom';

import apis from '../service/index';


function IssueCard(props) {



    const deleteIssue = async () => {
        console.log(props.id);
        const deleteIssue = await apis.removeIssue(props.id);
    }

    return (
        <div>
            
            <div className="issueCard__box">
                <ErrorOutlineIcon fontSize="small" htmlColor="#22863a"/>
                <div>
                    <Link to={{
                        pathname: `/${props.id}`,
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
                <div className="delete-icon" onClick={deleteIssue}><DeleteIcon/></div>
            </div>
        </div>
    )
}

export default IssueCard
