import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';


const styles={
    commentImage: {
        maxWidth: '100%',
        height: 50,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    gridComment:{
        marginTop: '9px',
    },

    userHandle:{
        fontWeight: 'bold'
    }



};
class Comments extends Component {
    render() {
        return (
            <Grid container spacing={2}>
                {this.props.comments.map((comment, index) =>(
                    <Grid item xs={12} key= {index}>
                        <Grid container spacing={1}>
                            <Grid item xs={1}>
                                <img
                                src={comment.userImage}
                                alt="comment"
                                className={this.props.classes.commentImage}
                                />
                            </Grid>
                            <Grid item xs={11} className={this.props.classes.gridComment}>
                                <Typography
                                    variant="subtitle2"
                                    className={ this.props.classes.userHandle}
                                >
                                    {comment.userHandle}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography variant="body2" align='justify'>{comment.body}</Typography>
                            </Grid>
                        </Grid>

                    </Grid>

                ))}
            </Grid>
        )
    }
}

export default withStyles(styles)(Comments);
