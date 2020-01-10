import React , {Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { downvoteProduct } from '../../redux/actions/dataAction';

import '../../components/downvote/downvote.css';
import LoginDialog from '../loginDialog/loginDialog.component';

class DownVote extends React.Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    downvoteProduct = () => {
        if(this.props.user.authenticated){
            const downvoteData = {
                userId: this.props.user.currentUser.userId,
            }
            this.props.downvoteProduct(this.props.product.productId, downvoteData);
        }
        else{
            this.handleOpen();
        }
        
    };
    render() {
        return (
            <Fragment>
                <Button className={this.props.tooltipClasses} onClick={this.downvoteProduct}>
                    < FontAwesomeIcon icon={faCaretUp} className={this.props.tooltipClassesDisplay} />
                    {this.props.visible ? (<span className={this.props.tooltipClassesDisplay}> UPVOTED </span>) : null}
                    <span className={this.props.visible ? `voteOpacity ${this.props.tooltipClassesDisplay}` : this.props.tooltipClassesDisplay}>{this.props.product.vote}</span>
                </Button>
                {this.state.open &&<LoginDialog openDialog={this.state.open} handleClose={this.handleClose} />}
            </Fragment>
            
        )
    }
}

DownVote.propTypes = {
    product: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    downvoteProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    downvoteProduct,
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(DownVote);