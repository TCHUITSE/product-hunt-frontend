import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class Post extends Component {
    render() {
        return (
            <div>
                <Typography variant= 'h5' align='center'> Submit a product</Typography>
                <Card size='md'>
                    <CardContent>
                        <Typography color='textPrimary' > Link</Typography>
                        <TextField
                                name="body"
                                type="text"
                                label="URL of product"
                                value=''
                                fullWidth
                                variant='outlined'
                                size='small'
                            />
                    </CardContent>
                    <CardActions>
                        <Button size="small">Next</Button>
                        <Typography color='textPrimary' > Not ready to launch?</Typography>
                        <Typography color='textPrimary' > You can schedule your launch. Learn more</Typography>
                    </CardActions>
                </Card>

            </div>
        )
    }
}

export default Post
