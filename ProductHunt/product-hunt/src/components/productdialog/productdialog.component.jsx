import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography  from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
//import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


const styles={
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
    }



};
export class ProductDialog extends Component {
    state ={
        cardType:'img',
        cardSource: null,

    };

    changeCard (type, source){
        console.log('card')
        this.setState({cardType: type, cardSource: source});

    };
    render() {
        return (
            <div>
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
            <Grid item xs={8}>
                <Card className={this.props.classes.card}>
                    <CardMedia
                        component={this.state.cardType}
                        src= {this.state.cardSource}
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
                    <CardActions>
                        <Button size="small" color="primary">
                            Share
                        </Button>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>

            </Grid>
            <Grid item xs={4}>

            </Grid>
        </Grid>
    </Grid>
)}
                
            </div>
        )
    }
}

export default withStyles(styles)(ProductDialog);





    