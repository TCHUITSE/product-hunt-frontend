import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import ProductList from '../product-list/product-list.component';

const HomePage= () =>(
    <div>
      <Row className="m-5">
        <Col xs="8">
          <ProductList></ProductList>
        </Col>
        <Col>

        </Col>
      </Row>
      
    </div>

);

export default HomePage;