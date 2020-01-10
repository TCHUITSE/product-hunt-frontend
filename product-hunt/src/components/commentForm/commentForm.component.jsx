import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import logo from '../../logo.png';
// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// Redux stuff
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataAction';

import LoginDialog from '../loginDialog/loginDialog.component';


const styles= {
    commentImage: {
        maxWidth: '100%',
        height: 50,
        objectFit: 'cover',
        borderRadius: '50%'
      },
      form:{
          display: 'inline-flex',
          width: '100%'
      },
      button: {
        color: 'white',
        marginLeft: '12px',
        backgroundColor: '#b74424',
        borderColor: '#b74424',
        '&:hover': {
            backgroundColor: '#cc4d29',
            borderColor: '#cc4d29',
          },
      },
      gridComment:{
          marginTop: '9px',
      }


};
class CommentForm extends Component {
    state={
        body:'',
        errors: {},
        open: false
    };
    
    handleOpen =() =>{
        console.log('open');  
        this.setState({open:true});
    };
    
    handleClose =() =>{
        this.setState({open: false});
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    componentWillReceiveProps(nextProps){
        console.log('madina');
        this.setState({body: '' });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const commentData={
            body:this.state.body,
            userId: this.props.user.currentUser.userId,
            photoURL: this.props.user.currentUser.photoURL,
            userHandle: this.props.user.currentUser.displayName,
        }
        this.props.submitComment(this.props.productId, commentData);
        console.log('submit');   
    };
    render() {
        return (
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item xs={1}>
                        <img
                            src={logo}
                            alt="comment"
                            className={this.props.classes.commentImage}
                        />
                    </Grid>
                    <Grid item xs={11} className={this.props.classes.gridComment}>
                        <form onSubmit={this.handleSubmit} className={this.props.classes.form}>
                            <TextField
                                name="body"
                                type="text"
                                label="What do you think of this product?"
                                value={this.state.body}
                                onChange={this.handleChange}
                                fullWidth
                                className={this.props.classes.textField}
                                variant='outlined'
                                size='small'
                            />
                            {this.props.user.authenticated ? (
                            <Button
                                type='submit'
                                variant="contained"
                                size='small'
                                className={this.props.classes.button}
                            >
                                Send
                            </Button> ): (
                            <Button
                                onClick={this.handleOpen}
                                variant="contained"
                                size='small'
                                className={this.props.classes.button}
                            >
                                Send
                            </Button>
                            )}
                            
                        </form>
                    </Grid>
                </Grid>
                {this.state.open && <LoginDialog openDialog={this.state.open} handleClose={this.handleClose}/>}
            </Grid>
        )
    }
}
CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    productId: PropTypes.string.isRequired,
    //authenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    UI: state.UI,
    //authenticated: state.user.authenticated,
    user: state.user
  });
  

export default connect(
    mapStateToProps,
    { submitComment }
  ) (withStyles(styles)(CommentForm));
