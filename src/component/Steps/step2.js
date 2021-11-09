import React from "react";
import { Box, Grid, Paper } from "@material-ui/core";
import { styles } from "../common/styles";
import {
    renderButton,
    renderInputField,
    renderText,
} from "../common/DisplayComponent";

function getPhoneDetails(handleChange, state) {
    return (
        <Grid item xs={12} sm={12}>
            {renderInputField({
                state,
                name: "phone",
                label: "Phone",
                onChange: handleChange,
            })}
        </Grid>
    );
}

function getEmailDetails(handleChange, state) {
    return (
        <Grid item xs={12} sm={12}>
            {renderInputField({
                state,
                name: "email",
                label: "Email",
                type: "email",
                onChange: handleChange,
            })}
        </Grid>
    );
}

const Step2 = ({ state, handleChange, handleNext, handlePrev }) => {
    return (
        <Paper style={styles.steps}>
            <Box mt={2} mb={2}>
                {renderText({
                    label: "Please Enter Your Details",
                    type: "h6",
                    color: "textPrimary",
                    align: "center",
                })}
            </Box>

            <Grid container spacing={1} style={{ marginBottom: "16px" }}>
                {state.data.channel == "sms" ? getPhoneDetails(handleChange, state) : getEmailDetails(handleChange, state)}
            </Grid>
            <Grid container component={Box} justify='flex-end' mt={2} p={2}>
                <Box ml={2}>
                    {renderButton({
                        label: "Back",
                        color: "default",
                        onClick: handlePrev,
                    })}
                </Box>
                <Box ml={2}>{renderButton({ label: "Next", onClick: handleNext })}</Box>
            </Grid>
        </Paper>
    );
};

export default Step2;