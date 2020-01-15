import React, { Component } from 'react'

//material-ui stuff
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';



import Step1 from '../post/step1';
import Step2 from '../post/step2';
import Step3 from '../post/step3';


const styles = {
    title: {
        fontWeight: 'bolder',
        fontSize: '28px',
        marginTop: '1%',
        marginBottom: '1%'
    },
    hidden:{
        visibility: 'hidden',
    },
    visible: {
        visibility: 'visible',
        backgroundColor: '#b74424',
        color: 'white',
        '&:hover': {
            backgroundColor: '#cc4d29',
        },
    }
}
export class PostSubmission extends Component {
    state={
        activeStep: 0,
    };
    handleNext = () => {
        const {activeStep}= this.state;
        this.setState({activeStep: activeStep + 1});
    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({ activeStep: activeStep - 1 });
    };
    
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };

    renderSwitch =(param) =>{
        const { firstName, lastName, email, occupation, city, bio } = this.state;
        const values = { firstName, lastName, email, occupation, city, bio };
        switch(param) {
            case 0:
                return (
                    <Step1
                    handleChange={this.handleChange}
                    values={values} />
                );
            case 1 :
                return (
                    <Step2
                    handleChange={this.handleChange}
                    values={values} />
                );
            case 2 :
            return (
                <Step3
                    handleChange={this.handleChange}
                    values={values} />
            );
        }
    }

    render() {
        return (
            <div>
                <Typography
                    variant='h5'
                    align='center'
                    className={this.props.classes.title}>
                    Tell us more about this product</Typography>

                <Grid container spacing={2}>
                    <Grid xs item> </Grid>
                    <Grid xs item>
                        <Card className='py-2 px-1'>
                            <CardContent>
                                {this.renderSwitch(this.state.activeStep)}
                                <MobileStepper
                                    variant="dots"
                                    steps={3}
                                    position="static"
                                    activeStep={this.state.activeStep}
                                    nextButton={
                                        <Button size="small"
                                            onClick={this.handleNext}
                                            variant='contained'
                                            className={this.state.activeStep === 2 ? this.props.classes.hidden : this.props.classes.visible}>
                                            Next
                                        </Button>
                                    }
                                    backButton={
                                        <Button size="small"
                                            onClick={this.handleBack}
                                            variant='contained'
                                            className={this.state.activeStep === 0 ? this.props.classes.hidden : this.props.classes.visible}>
                                            Back
                                        </Button>
                                    }
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs item> </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(PostSubmission)
