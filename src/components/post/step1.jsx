import React, { Component } from 'react';

//material-ui stuff
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';



const styles={
    label: {
        fontWeight: 'bold',
        display: 'inline-block',
    },
    ligne: {
        marginLeft:'5px',
        display: 'inline-block',
    }
};

export class Step1 extends Component {
    render() {
        const topics={
            multiple:true,

        }
        return (
            <div>
                <Typography className={this.props.classes.label}>Name of the product </Typography>
                <Typography color='textSecondary' className={this.props.classes.ligne}> - Required</Typography>
                <TextField
                    type='url'
                    name='download-link'
                    required
                    fullWidth
                    placeholder='Simply the name of the product'
                    variant='outlined'
                    size='small'
                    className='mt-2 mb-4'
                />
                <Typography className={this.props.classes.label}>Tagline </Typography>
                <Typography color='textSecondary' className={this.props.classes.ligne}> - Required</Typography>
                <TextField
                    type='url'
                    name='download-link'
                    required
                    fullWidth
                    placeholder='Concise and descriptive tagline for the product'
                    variant='outlined'
                    size='small'
                    className='mt-2 mb-4'
                />
                <Typography className={this.props.classes.label}>Topics </Typography>
                <TextField
                    type='url'
                    name='download-link'
                    required
                    select
                    SelectProps={topics}
                    fullWidth
                    placeholder='Add a topic'
                    variant='outlined'
                    size='small'
                    className='mt-2 mb-4'
                />
                <Typography className={this.props.classes.label}>Download link </Typography>
                <Typography color='textSecondary' className={this.props.classes.ligne}> - App Store, Google Play...</Typography>
                <TextField
                    type='url'
                    name='download-link'
                    required
                    fullWidth
                    disabled
                    placeholder='Concise and descriptive tagline for the product'
                    variant='outlined'
                    size='small'
                    className='mt-2 mb-4'
                />
                <Typography className={this.props.classes.label}>Thumbnail </Typography>
                <Typography color='textSecondary' className={this.props.classes.ligne}> - Required</Typography>
                <Typography color='textSecondary'>Make it look nice and professional.</Typography>
                <TextField
                    type='file'
                    name='download-link'
                    required
                    fullWidth
                    placeholder='Concise and descriptive tagline for the product'
                    variant='outlined'
                    size='small'
                    className='mt-2 mb-4'
                />
                <Typography className={this.props.classes.label}>Status </Typography>
                <Checkbox
                    
                    color="default"
                    value="default"
                />

            </div>
        )
    }
}

export default withStyles(styles)(Step1)
