import React, {useEffect, useContext} from 'react'
import '../IssueCard.css'
import UserContext from '../../context/UserContext';

function IssueCard(props) {

    return (
        <div>
            
            <div className="issueCard__box">
                <div>
                    <h6>{props.name} <p className="issueCard__text">{`commented on ${props.createdAt}`}</p></h6>
                    <hr></hr>
                    <p>{props.body}</p>
                </div>
            </div>
        </div>
    )
}

export default IssueCard