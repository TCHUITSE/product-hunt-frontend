import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../../redux/actions/dataAction';



import Product from '../product/product.component';

const styles = {
    productCard: {
        padding: '0px'
    },
    
    productCardContain: {
        margin: '0px',
        padding: '0px',
    },
  };


class ProductList extends React.Component{
   
    componentDidMount(){
        this.props.getProducts();   
    }

    render(){
        const { products} = this.props.data;
        return (
            <Card className={this.props.classes.productCard} variant="outlined">
                <CardContent className={this.props.classes.productCardContain}>
                    {products.map(product =>(
                        <Product key= {product.productId} productItem={product}/>
                    )
                    )}
                </CardContent>

            </Card>



        );
    }
}
ProductList.propTypes = {
    getProducts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    data: state.data
  });
  
export default connect(
    mapStateToProps,
    { getProducts }
  ) (withStyles(styles)(ProductList));