import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
//import Button from '@material-ui/core/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faComment, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { getProduct, clearErrors } from '../../redux/actions/dataAction';
import DialogContent from '@material-ui/core/DialogContent';

import UpVote from '../upvote/upvote.component'; 
import '../../components/product/product.css';
import ProductDialog from '../productdialog/productdialog.component';


const styles = {
    dialogContent:{
      backgroundColor: '#f4f4f4',
      overflow: 'auto',
      height:'100%',
      
    }
}
class Product extends React.Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    };
    handleOpen = () => {
        let oldPath = window.location.pathname;
        const newPath = `/post/${this.props.productItem.productId}`;
    
        //if (oldPath === newPath) oldPath = `/users/${userHandle}`;
    
        window.history.pushState(null, null, newPath);
    
        this.setState({ open: true, oldPath, newPath });
        this.props.getProduct(this.props.productItem.productId);
      };
      handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false });
        this.props.clearErrors();
      };

    render() {
        return (
            <Container className="product p-0" fluid= {true} onClick={this.handleOpen}>
                <Row className= "p-4" >
                    <Col>
                        <img
                            src={this.props.productItem.thumbnail}
                            width="70"
                            height="70"
                            className="d-inline-block align-top"
                            alt="thumbnail"
                        />
                    </Col>
                    <Col xs= {8}> 
                        <Row> <span>{this.props.productItem.name}</span> </Row>
                        <Row> <span className="tagLine">{this.props.productItem.tagLine}</span> </Row>
                        <Row className="mt-2">
                            <Button className='bouton' size='sm'>
                                <FontAwesomeIcon icon={faComment} />
                                { `  ${this.props.productItem.comment}`}
                            </Button>
                            <Button className='bouton ml-2' size='sm' >
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                            </Button>
                            <span className='ml-2 mt-1 topics'>{this.props.productItem.topics[0]}</span>
                        </Row>
                    </Col>
                    <Col> <UpVote product={this.props.productItem}/></Col>
                </Row>
                <Divider light={true}></Divider>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="lg"
                > 
                    <DialogContent  className={this.props.classes.dialogContent}>
                        <ProductDialog product={this.props.product} loading={this.props.UI.loading}> </ProductDialog>
                    </DialogContent>
                </Dialog>
            </Container>
        )
    }
}
Product.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired,
    //productId: PropTypes.string.isRequired,
    //userHandle: PropTypes.string.isRequired,
    product: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    product: state.data.product,
    UI: state.UI
  });
  
  const mapActionsToProps = {
    getProduct,
    clearErrors
  };
export default connect(
    mapStateToProps,
    mapActionsToProps
  )(withStyles(styles) (Product));