import React ,{Fragment}from 'react';
import Button from 'react-bootstrap/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretUp} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { upvoteProduct} from '../../redux/actions/dataAction';

import '../../components/upvote/upvote.css';
import LoginDialog from '../loginDialog/loginDialog.component';

class UpVote extends React.Component{
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };

    upvoteProduct = () =>{
        if(this.props.user.authenticated){
            const upvoteData = {
                userId: this.props.user.currentUser.userId,
                userHandle: this.props.user.currentUser.displayName,
            }
            this.props.upvoteProduct(this.props.product.productId, upvoteData);
        }
        else{ 
            this.handleOpen();
        }
           
    };

    render(){
        return(
            <Fragment>
                <Button className={this.props.tooltipClasses} onClick={this.upvoteProduct}>
                    < FontAwesomeIcon icon={faCaretUp} className={this.props.tooltipClassesDisplay} />
                    {this.props.visible ? (<span className={this.props.tooltipClassesDisplay}> UPVOTE </span>) : null}
                    <span className={this.props.visible ? `voteOpacity ${this.props.tooltipClassesDisplay}` : this.props.tooltipClassesDisplay}>{this.props.product.vote}</span>
                </Button>
                {this.state.open && <LoginDialog openDialog={this.state.open} handleClose={this.handleClose} />}
            </Fragment>
            
        )  
    }
}

UpVote.propTypes={
    product: PropTypes.object.isRequired,
    upvoteProduct: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) =>({
    user: state.user
});

const mapActionsToProps = {
    upvoteProduct,
}

export default  connect(
    mapStateToProps,
    mapActionsToProps
)  (UpVote);