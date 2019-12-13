import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import logo from '../../logo.png';

import '../../components/header/header.css';

const  Header  = () =>(
<Navbar   className="header shadow pl-5 " expand="lg">
  <Navbar.Brand href="#">
    <img
        src={logo}
        width="50"
        height="50"
        className="d-inline-block align-top"
        alt="Product Hunt logo"
    />
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Form inline>
      <FormControl type="search" placeholder="Discover your next favorite thing ..." className=" input" />
    </Form>
    <Nav className="mr-auto ml-4">
      <Nav.Link href="#home" className="lien">Deals</Nav.Link>
      <Nav.Link href="#link" className="lien">Jobs</Nav.Link>
      <Nav.Link href="#home" className="lien">Makers</Nav.Link>
      <Nav.Link href="#link" className="lien">Radio</Nav.Link>
      <Nav.Link href="#home" className="lien">Ship</Nav.Link>
      <Nav.Link href="#link" className="lien">...</Nav.Link>
    </Nav>
    <Form inline>
      <Button className="bouton-login mx-2">LOG IN</Button>
      <Button  className="bouton-signup mr-5">SIGN UP</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
);

export default Header;

