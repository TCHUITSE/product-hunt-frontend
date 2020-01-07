import React from 'react';
import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretUp} from '@fortawesome/free-solid-svg-icons'

import '../../components/upvote/upvote.css';

const UpVote = props =>(
    <Button className='bouton p-4' >
        < FontAwesomeIcon icon={faCaretUp}/> <br/>
        {props.product.vote}
    </Button>

);

export default UpVote