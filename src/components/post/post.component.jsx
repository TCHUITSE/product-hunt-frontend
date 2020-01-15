import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//material-ui stuff
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const styles={
    title:{
        fontWeight:'bolder',
        fontSize: '28px',
        marginTop: '1%',
        marginBottom: '1%'
    },
    label:{
        fontWeight: 'bold',
        
    },
    nextButton:{
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor:'#b74424',
        color: 'white',
        '&:hover': {
            backgroundColor: '#cc4d29',
        },
        marginBottom:'5%',
    },
    lien:{
        color: '#b74424',
        display:'inline-block',
        '&:hover': {
            color: '#b74424',
        },
    }
}
export class Post extends Component {

    handleSubmit = () => {
        this.props.history.push ('/posts/new/submission');    
    }
    render() {
        return (
            <div>
               <Typography 
               variant='h5'
               align='center'
               className={this.props.classes.title}>
                   Submit a product</Typography> 

                <Grid container  spacing={2}>
                    <Grid xs item> </Grid>
                    <Grid xs item> 
                        <Card className='py-2 px-1'>
                            <CardContent>
                                <form onSubmit={this.handleSubmit} autoComplete="off">
                                    <Typography className={this.props.classes.label}>Link</Typography>
                                    <TextField
                                        type='url'
                                        name='download-link'
                                        required
                                        fullWidth
                                        placeholder='URL of the product'
                                        variant='outlined'
                                        size='small'
                                        className='mt-2 mb-4'
                                    />
                                    <Button variant='contained' type='submit' className={this.props.classes.nextButton}> Next</Button>

                                </form>
                                <Typography variant='body2' align='center' className={this.props.classes.label}>Not ready to launch today?</Typography>
                                <Typography variant='body2' align='center'>You can schedule your launch.  <Typography variant='body2' component={Link} to= 'https://help.producthunt.com/en/articles/2724119-how-to-schedule-a-post' className={this.props.classes.lien}>Learn more</Typography> </Typography>

                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs item> </Grid>
                </Grid>
                
            </div>
        )
    }
}

export default withStyles(styles)(Post);
