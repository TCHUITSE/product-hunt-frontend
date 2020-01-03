import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import logo from '../../logo.png';
import kitty from '../../kitty.png';
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import PropTypes from 'prop-types';
import firebase from 'firebase';
// Redux 
import { connect } from 'react-redux';
import { loginUser, firebaseObject } from '../../redux/actions/userAction';

import '../../components/header/header.css';

const styles = {
  dialogTitle:{
    position:'center',
    marginLeft:'auto',
    marginRight:'auto',
  },
  title:{
    fontWeight:'bold'
  },
  subtitle:{
    color:'grey',
    marginBottom: '2px'
  }, 
  dialogContent:{
    height:'35vh',
  },
  subsubtitle:{
    color: 'grey',
    fontSize:'11px'
  },
  gridBouton:{
    marginTop:'8px',
    marginBottom: '10px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  twitter:{
    backgroundColor: '#00aced',
    borderColor: '#00aced',
    fontSize: '12px',
    fontWeight:'bold'
  },
  facebook:{
    backgroundColor: '#3b5998',
    borderColor: '#3b5998',
    fontSize: '12px',
    fontWeight:'bold'

  },
  google:{
    backgroundColor: '#fff',
    borderColor: '#e8e8e8',
    fontSize: '12px',
    fontWeight:'bold',
    color: 'black'
  },
  angellist:{
    backgroundColor: '#333',
    borderColor: '#333',
    fontSize: '12px',
    fontWeight:'bold'
  }
};


class Header extends React.Component{
   state ={
     open: false,
   };
   uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl:'/',
    signInOptions: [
      firebaseObject.auth.TwitterAuthProvider.PROVIDER_ID,
      firebaseObject.auth.FacebookAuthProvider.PROVIDER_ID,
      firebaseObject.auth.GoogleAuthProvider.PROVIDER_ID, 
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => this.handleClose(),
    }
  };

  componentDidMount = () => {
    this.props.loginUser();
  }
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
          {authenticated ? (<Fragment>
            <Button className="bouton-login mx-2" onClick={() => firebase.auth().signOut()}>LOG OUT</Button> 
            </Fragment>
            
          ) : (<Fragment><Button className="bouton-login mx-2" onClick={this.handleOpen}>LOG IN</Button>
          <Button  className="bouton-signup mr-5" onClick={this.handleOpen}>SIGN UP</Button></Fragment>)}
        </Form>
      </Navbar.Collapse>
    </Navbar>
    <Dialog
      open={this.state.open}
      onClose ={this.handleClose}
      fullWidth
      maxWidth="md"
      className={this.props.classes.dialog}>
      <DialogTitle className={this.props.classes.dialogTitle}>
        <img
            src={kitty}
            width="70"
            height="70"
            className="d-inline-block align-top"
            alt="logo message"
          />  
      </DialogTitle>
      <DialogContent className={this.props.classes.dialogContent}>
        <Typography align='center' variant='h6' className={this.props.classes.title}>
            Login to Product Hunt
        </Typography>
        <Typography align ='center' variant ='subtitle1' className={this.props.classes.subtitle}>
            We're a community of product people  here to geek out and discover new,<br/> interesting products.
        </Typography>
        <Grid container spacing={3} className={this.props.classes.gridBouton}>
        <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebaseObject.auth()}
        />
        </Grid>
        <Typography align ='center' variant ='body2' className= {this.props.classes.subsubtitle}>
            We'll never post to any of your accounts without your permission.
        </Typography>
      </DialogContent>
    </Dialog>
  </Fragment>

    );
  }
};

  Header.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    //user: PropTypes.object.isRequired,
    //UI: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired
  };
  
  const mapStateToProps = (state) => ({
    //user: state.user,
    //UI: state.UI,
    authenticated: state.user.authenticated,
  });
  
  const mapActionsToProps = {
    loginUser,
  };

export default  connect(
  mapStateToProps,
  mapActionsToProps
) (withStyles(styles)(Header));


