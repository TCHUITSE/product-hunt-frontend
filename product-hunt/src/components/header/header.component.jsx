import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import logo from '../../logo.png';

import PropTypes from 'prop-types';
import firebase from 'firebase';
// Redux 
import { connect } from 'react-redux';
//import { loginUser } from '../../redux/actions/userAction';

import '../../components/header/header.css';
import LoginDialog from '../loginDialog/loginDialog.component';




class Header extends React.Component{
  state={
    open: false
  };

  handleOpen = () => {
    this.setState({open:true});
  };
  handleClose = () => {
    this.setState({open:false});
  };
  render (){
    const { authenticated } = this.props;
    return(
    <Fragment>
    <Navbar   className="header shadow pl-5 " expand="lg">
      <Navbar.Brand>
        <Link to ='/'>
          <img
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="Product Hunt logo"
          />
        </Link>
        
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline className='element1' >
          <FormControl type="search" placeholder="Discover your next favorite thing ..." className=" input" />
        </Form>
        <Nav className="mr-auto ml-auto ml-4 element2" >
          <Nav.Link href="#home" className="lien">Deals</Nav.Link>
          <Nav.Link href="#link" className="lien">Jobs</Nav.Link>
          <Nav.Link href="#home" className="lien">Makers</Nav.Link>
          <Nav.Link href="#link" className="lien">Radio</Nav.Link>
          <Nav.Link href="#home" className="lien">Ship</Nav.Link>
          <Nav.Link href="#link" className="lien">...</Nav.Link>
        </Nav>
        <Form inline className='element3'>
          {authenticated ? (<Fragment>
            <Button className="bouton-login mx-2" onClick={() => firebase.auth().signOut()}>LOG OUT</Button> 
            </Fragment>
            
          ) : (<Fragment><Button className="bouton-login mx-2" onClick={this.handleOpen}>LOG IN</Button>
          <Button  className="bouton-signup mr-5" onClick={this.handleOpen}>SIGN UP</Button></Fragment>)}
        </Form>
      </Navbar.Collapse>
    </Navbar>
    <LoginDialog openDialog={this.state.open} handleClose={this.handleClose}/>
    
  </Fragment>
    );
  }
};

  Header.propTypes = {
    //classes: PropTypes.object.isRequired,
    //loginUser: PropTypes.func.isRequired,
    //user: PropTypes.object.isRequired,
    //UI: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    //user: state.user,
    //UI: state.UI,
    authenticated: state.user.authenticated,
  });
  
  

export default  connect(
  mapStateToProps
) (Header);


