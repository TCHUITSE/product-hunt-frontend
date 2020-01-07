import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import kitty from '../../kitty.png';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { loginUser, firebaseObject } from '../../redux/actions/userAction';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';

import '../../components/loginDialog/loginDialog.css';

const styles={
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
      angellist:{
        backgroundColor: '#333',
        borderColor: '#333',
        fontSize: '12px',
        fontWeight:'bold'
    },
    close:{
      backgroundColor:'white', 
    }
};
class LoginDialog extends Component {
    uiConfig = {
        signInFlow: "popup",
        signInSuccessUrl:'/',
        signInOptions: [
          firebaseObject.auth.TwitterAuthProvider.PROVIDER_ID,
          firebaseObject.auth.FacebookAuthProvider.PROVIDER_ID,
          firebaseObject.auth.GoogleAuthProvider.PROVIDER_ID, 
        ],
        callbacks: {
          signInSuccessWithAuthResult: () => this.props.handleClose(),
        }
    };
    componentDidMount = () => {
        this.props.loginUser();
    };
    

    render() {
        return (
            <Dialog
                open={this.props.openDialog}
                onClose ={this.props.handleClose}
                fullWidth
                maxWidth="md"
                className={this.props.classes.dialog}>
                <Fab aria-label="close" size="small" className={this.props.classes.close} onClick={this.props.handleClose}>
                  <CloseIcon/>
                </Fab>
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
        )
    }
}
LoginDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    //user: PropTypes.object.isRequired,
    //UI: PropTypes.object.isRequired,
    //authenticated: PropTypes.bool.isRequired,
  };
const mapActionsToProps = {
    loginUser,
  };
  const mapStateToProps = (state) => ({
    //user: state.user,
    //UI: state.UI,
    //authenticated: state.user.authenticated,
  });

export default connect(
    mapStateToProps,
    mapActionsToProps
  ) (withStyles(styles) (LoginDialog));
