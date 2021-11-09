import React from "react";
import { Box, Paper } from "@material-ui/core";
import { styles } from "../common/styles";
import { renderText } from "../common/DisplayComponent";

const FinalStep = ({ httpStatus }) => {
    return (
        <Paper style={styles.steps}>
            <Box mt={2} mb={2}>
                {renderText({
                    label: httpStatus == 200 ? "Message Sent SuccessFully" : "Please TRY Again",
                    type: "h6",
                    color: "textPrimary",
                    align: "center",
                })}
            </Box>
        </Paper>
    );
};

export default FinalStep;