import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography  from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import CodeIcon from '@material-ui/icons/Code';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProduct} from '../../redux/actions/dataAction';
import DialogContent from '@material-ui/core/DialogContent';

import Comments from  '../comments/comments.component';
import CommentForm from '../commentForm/commentForm.component';




const styles={
    dialogContent:{
        backgroundColor: '#f4f4f4',
        overflow: 'auto',
        height:'100%',    
    },
    tagLine:{
        color: 'grey',
    },
    spinnerDiv:{
        textAlign: 'center',
    },
    dialogTitle:{
        fontWeight:'bold',
    },
    bouton:{
        fontSize: '10px',
        backgroundColor: '#f2f2f2',
    },
    gridCard:{
        marginTop: '10px',
    },
    card: {
        padding: '20px',
    },
    minicard:{
        height:'60px',
        width: '60px',
    },
    minicardArea:{
        height:'100%',
    },
    customButtonTweet:{
        color:'#00aced',
        borderColor:'#00aced',
        '&:hover': {
            backgroundColor: '#00aced',
            color:'white',
          },
    },
    customButtonFacebook:{
        color:'#3b5998',
        borderColor:'#3b5998',
        '&:hover': {
            backgroundColor: '#3b5998',
            color:'white',
          },
    }



};
export class ProductDialog extends Component {
   
    state = {
        open: false,
        oldPath: '',
        newPath: '',
        cardType:'img',
        cardSource: null,
    };
    componentDidMount = () => {
        if(this.props.openDialog){
            console.log('handle product dialog open')
            this.handleOpen();
        }
    };

    handleOpen = () => {
            
            let oldPath = window.location.pathname;
            const newPath = `/post/${this.props.productItem.productId}`;
    
            window.history.pushState(null, null, newPath);
    
            this.setState({ open: true, oldPath, newPath });
            this.props.getProduct(this.props.productId);
        
    };
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false });
        this.props.handleClose();
    };

    changeCard (type, source){
        console.log('card')
        this.setState({cardType: type, cardSource: source});

    };
    render() {
        return (
            <Dialog
                open={this.props.openDialog}
                onClose={this.handleClose}
                fullWidth
                maxWidth="lg"
            > 
                <DialogContent  className={this.props.classes.dialogContent}>
                    {this.props.loading ? (
                         <div  className={ this.props.classes.spinnerDiv}>
                            <CircularProgress size={200} thickness={2} />
                        </div>
                    ) : (
                        <Grid container spacing={1} >
                            <Grid item xs={1}>
                                <img
                                    src={this.props.product.thumbnail}
                                    width="90"
                                    height="90"
                                    className="d-inline-block align-top"
                                    alt="thumbnail"
                                />
                            </Grid>
                            <Grid item container xs={11} direction='column' spacing={1}>
                                <Grid item xs>
                                    <Typography variant='h6' className={this.props.classes.dialogTitle}>
                                        {this.props.product.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant='body2' className={this.props.classes.tagLine}>
                                        {this.props.product.tagLine}
                                    </Typography>
                                </Grid>
                                <Grid item container spacing={1}>
                                    {
                                        this.props.product.topics.map((topic,index) =>(
                                            <Grid item  key={index}>
                                                <Button className={this.props.classes.bouton} size='small' variant='outlined'> {topic}</Button>
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} className={this.props.classes.gridCard}>
                                <Grid item container spacing={2} xs={8} >
                                    <Grid item >
                                        <Card className={this.props.classes.card}>
                                            <CardMedia
                                                component='img'
                                                src= {this.props.product.gallery[0]}
                                            />
                                            <CardContent>
                                                <Grid container spacing={1} className={this.props.classes.gridCard}>
                                                    {
                                                        this.props.product.gallery.map((image, index) => (
                                                            <Grid item  key={index}>
                                                                <Card className={this.props.classes.minicard} >
                                                                    <CardMedia 
                                                                        onClick={() => this.changeCard('img', image)}
                                                                        className={this.props.classes.minicardArea}
                                                                        component= 'img'
                                                                        src ={image}
                                                                    />
                                                                </Card>

                                                            </Grid>
                                                        ))
                                                    }
                                                    {
                                                        this.props.product.youtubeVideo.map((video, index) => (
                                                            <Grid item  key={index}>
                                                                <Card className={this.props.classes.minicard} >
                                                                    <CardMedia 
                                                                        className={this.props.classes.minicardArea}
                                                                        component= 'video'
                                                                        src ={video}
                                                                    />
                                                                </Card>
                                                            </Grid>
                                                        ))
                                                    }
                                                </Grid>
                                                
                                            </CardContent>
                                            <Divider light={true}/>
                                            <CardActions>
                                                <Grid container  spacing={2} className={this.props.classes.gridCard}>
                                                    <Grid item>
                                                        <Typography variant='body2' align='justify' >
                                                            {this.props.product.description}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item container column spacing={2}>
                                                        <Grid item>
                                                            <Button
                                                                className={this.props.classes.customButtonTweet}
                                                                variant="outlined"
                                                                size ="small"
                                                                startIcon={<TwitterIcon />}
                                                            >
                                                                tweet
                                                            </Button>
                                                        </Grid>
                                                        <Grid item >
                                                            <Button
                                                                variant="outlined"
                                                                className={this.props.classes.customButtonFacebook}
                                                                size ="small"
                                                                color="primary"
                                                                startIcon={<FacebookIcon />}
                                                            >
                                                                share
                                                            </Button>
                                                        </Grid>
                                                        <Grid item >
                                                            <Button
                                                                variant="outlined"
                                                                size ="small"
                                                                color="default"
                                                                startIcon={<CodeIcon />}
                                                            >
                                                                embed
                                                            </Button>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button
                                                                variant="outlined"
                                                                size ="small"
                                                                color="default"
                                                                startIcon={<PlaylistAdd />}
                                                            >
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='overline'>Discussion</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Card >
                                            <CardContent className={this.props.classes.card}>
                                                <Comments comments={this.props.product.comments}></Comments>   
                                            </CardContent>
                                            <Divider light={true}/>
                                            <CardContent className={this.props.classes.card}>
                                                <CommentForm productId={this.props.product.productId}> </CommentForm>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4}>

                                </Grid>
                            </Grid>
                        </Grid>
                    )}
        
                </DialogContent>
            </Dialog>
        )
        
    }
}
ProductDialog.propTypes = {
    getProduct: PropTypes.func.isRequired,
    productId: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    openDialog: PropTypes.bool.isRequired,
    //userHandle: PropTypes.string.isRequired,
    product: PropTypes.object.isRequired,
    UI: PropTypes.object
  };
  
  const mapStateToProps = (state) => ({
    product: state.data.product,
    loading: state.UI.loading,
  });
  
  const mapActionsToProps = {
    getProduct
  };

export default connect(
    mapStateToProps,
    mapActionsToProps
  ) (withStyles(styles)(ProductDialog));





    