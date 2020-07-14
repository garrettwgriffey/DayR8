import React from "react";
import Alert from '@material-ui/lab/Alert';

function AlertDupUser() {
    return (
      <div>
        <Alert severity="error">There is already a user with that username! Please select another.</Alert>
      </div>
    );
  }
  
  export default AlertDupUser;