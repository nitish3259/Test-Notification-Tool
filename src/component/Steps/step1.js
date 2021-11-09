import React from "react";
import { Box, Grid, Paper } from "@material-ui/core";
import { styles } from "../common/styles";
import {
    renderButton,
    renderSelect,
    renderText,
} from "../common/DisplayComponent";

const Step1 = ({ state, handleChange, handleNext }) => {
    return (
        <Paper style={styles.steps}>
            <Box mt={2} mb={2}>
                {renderText({
                    label: "Please Select Channel",
                    type: "h6",
                    color: "textPrimary",
                    align: "center",
                })}
            </Box>

            <Grid container spacing={1} style={{ marginBottom: "16px" }}>
                <Grid item xs={12}>
                    {renderSelect({
                        state,
                        name: "channel",
                        label: "Channel",
                        options: [
                            { key: "Email", value: "email" },
                            { key: "SMS", value: "sms" },
                        ],
                        onChange: handleChange,
                    })}
                </Grid>
            </Grid>
            <Grid container component={Box} justify='flex-end' mt={2} p={2}>
                {renderButton({ label: "Next", onClick: handleNext, channel: state.data.channel })}
            </Grid>
        </Paper>
    );
};

export default Step1;