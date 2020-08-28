import React from "react";
import Alert from '@material-ui/lab/Alert';

function AlertDupUser(props) {
    return (
      <div>
        {props.type==="signup" ? <Alert severity="error">There is already a user with that username! Please select another.</Alert> : props.type==="login" ? <Alert severity="error">Oops! Your username or password is incorrect. Please try again!</Alert> : null}
      </div>
    );
  }
  
  export default AlertDupUser;