import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
//import Button from '@material-ui/core/Button';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faComment, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProduct } from '../../redux/actions/dataAction';


import UpVote from '../upvote/upvote.component'; 
import '../../components/product/product.css';
import ProductDialog from '../productdialog/productdialog.component';


class Product extends React.Component {

    state={
        open:false,
        oldPath: '',
        newPath: '',
    };
    handleOpen = () => {
        let oldPath = window.location.pathname;
        const newPath = `/post/${this.props.productItem.productId}`;
        window.history.pushState(null, null, newPath);
        this.setState({ open: true, oldPath, newPath });
        this.props.getProduct(this.props.productItem.productId);
        

    };
    handleClose = () => {
         window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false });
    };
    
    render() {
        return (
            <Container className="product p-0" fluid= {true} >
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
                            <Button className='bouton ml-2' size='sm' onClick={this.handleOpen} >
                                click
                            </Button>
                            <span className='ml-2 mt-1 topics'>{this.props.productItem.topics[0]}</span>
                        </Row>
                    </Col>
                    <Col> <UpVote product={this.props.productItem}/></Col>
                </Row>
                <Divider light={true}></Divider>
                <ProductDialog  
                    openDialog={this.state.open}
                    handleClose={this.handleClose}
                    loading={this.props.UI.loading}
                    product= {this.props.product}
                >
                </ProductDialog>

            </Container>
        )
    }
}

Product.propTypes = {
    getProduct: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    product: state.data.product,
    UI: state.UI,
});

const mapActionsToProps = {
    getProduct
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Product)