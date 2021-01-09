import React, {useEffect, useContext} from 'react'
import './IssueCard.css'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Link } from 'react-router-dom';

function IssueCard(props) {

    return (
        <div>
            
            <div className="issueCard__box">
                <ErrorOutlineIcon fontSize="small" htmlColor="#22863a"/>
                <div>
                    <p className="issueCard__title">name1</p>
                    <Link to={{
                        pathname: '/DiscussionThread',
                        aboutProps: {
                            title: props.title,
                        }
                    }}>{props.title}</Link>

                    <p className="issueCard__text">#Opened by darahas 4 hours go</p>
                </div>
            </div>
        </div>
    )
}

export default IssueCard
