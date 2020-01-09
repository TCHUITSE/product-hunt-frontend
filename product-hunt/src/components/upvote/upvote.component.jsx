import React from 'react';
import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretUp} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { upvoteProduct } from '../../redux/actions/dataAction';

import '../../components/upvote/upvote.css';
// import LoginDialog from '../loginDialog/loginDialog.component';

class UpVote extends React.Component{
    

    handleUpvote = () =>{
        const upvoteData = {
            userId: this.props.user.currentUser.userId,
            userHandle: this.props.user.currentUser.displayName,
        }
        this.props.upvoteProduct(this.props.product.productId, upvoteData);
        console.log('submit upvote');   
    };
    render(){
        return(
            <Button className={this.props.style.value} onClick={this.handleUpvote}>
                < FontAwesomeIcon icon={faCaretUp} /> <br />
                {this.props.product.vote}
            </Button>
        );
    }
}

UpVote.propTypes={
    product: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired,
    upvoteProduct: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) =>({
    user: state.user
});

const mapActionsToProps = {
    upvoteProduct
}

export default  connect(
    mapStateToProps,
    mapActionsToProps
) (UpVote);