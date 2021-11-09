import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
    Box,
    Grid,
    Paper,
    withStyles,
    Stepper,
    Step,
    StepLabel,
} from "@material-ui/core";
import Step1 from "./Steps/step1";
import Step2 from "./Steps/step2";
import Step3 from "./Steps/step3";
import FinalStep from "./Steps/FinalStep";
import { renderText } from "./common/DisplayComponent";
import { styles } from "./common/styles";

const api_key = "7laYuLYupHWxIh7ACXgCoIqLETHysqyhwgpTKPQ2ttc=";
var httpStatus;

class FormComponent extends Component {
    state = {
        data: {
            channel: "",
            phone: "",
            email: "",
            otp: "",
            help_email: "",
            httpStatus: ""
        },
        errors: {},
        steps: [
            { label: "Select Channel" },
            { label: "Input recipient details" },
            { label: "Message Details" },
        ],
        stepCount: 0,
    };
    render() {
        const { classes } = this.props;

        const handleSubmit = (e) => {
            e.preventDefault();
            let data = {
                "event": "otp",
                "user": {
                    "mobile": this.state.data.phone,
                    "email": this.state.data.email
                },
                "data": {
                    "otp": this.state.data.otp,
                    "help_email": this.state.data.help_email
                }
            };
            let axiosConfig = {
                headers: {
                    "Host": "https://api.ravenapp.dev",
                    "Authorization": `AuthKey ${api_key}`,
                    "Content-Type": "application/json"
                }
            };
            axios.post("https://api.ravenapp.dev/v1/apps/f1a11eee-e6e7-4637-9997-8411c29b376c/events/send", data, axiosConfig)
                .then(function (response) {
                    console.log(response.status);
                    httpStatus = response.status;
                    handleNextStep();
                })
                .catch(function (error) {
                    console.log(error);
                });
            console.log("form submitted");
        };

        const handleOnChange = ({ target }) => {
            const { data, errors } = this.state;

            target.value.length < 3
                ? (errors[target.name] = `${target.name} have at least 3 letter`)
                : (errors[target.name] = "");

            data[target.name] = target.value;
            this.setState({ data, errors });
        };

        const handleNextStep = () => {
            let { stepCount } = this.state;
            stepCount = stepCount + 1;
            this.setState({ stepCount });
        };
        const handleBackStep = () => {
            let { stepCount } = this.state;
            stepCount = stepCount - 1;
            this.setState({ stepCount });
        };

        const getStepContent = (step) => {
            switch (step) {
                case 0:
                    return (
                        <Step1
                            state={this.state}
                            handleChange={handleOnChange}
                            handleNext={handleNextStep}
                        />
                    );
                case 1:
                    return (
                        <Step2
                            state={this.state}
                            handleChange={handleOnChange}
                            handleNext={handleNextStep}
                            handlePrev={handleBackStep}
                        />
                    );
                case 2:
                    return (
                        <Step3
                            state={this.state}
                            handleChange={handleOnChange}
                            handleNext={handleNextStep}
                            handlePrev={handleBackStep}
                            handleSubmit={handleSubmit}
                        />
                    );
                case 3:
                    return <FinalStep data={this.state.data} httpStatus={httpStatus} />;
                default:
                    return (
                        <Step1
                            state={this.state}
                            handleChange={handleOnChange}
                            handleNext={handleNextStep}
                        />
                    );
            }
        };

        return (
            <Grid container className={classes.formContainer} >
                <Grid item xs={12} sm={7}>
                    <form onSubmit={this.handleSubmit} className={classes.form}>
                        <Paper component={Box} mb={1}>
                            <Box pt={2}>
                                {renderText({
                                    type: "h6",
                                    color: "primary",
                                    label: "Test Notification Tool",
                                    align: "center",
                                })}
                            </Box>
                            <Stepper activeStep={this.state.stepCount} alternativeLabel>
                                {this.state.steps.map((item) => (
                                    <Step key={item.label}>
                                        <StepLabel>{item.label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Paper>
                        {getStepContent(this.state.stepCount)}
                    </form>
                </Grid>
            </Grid>
        );
    }
}

FormComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormComponent);