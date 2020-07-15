import validator from "validator";
import React from "react";

export default{
 required: (value) => {
        if (!value.toString().trim().length) {
          // We can return string or jsx as the 'error' prop for the validated Component
          return 'require';
        }
      },
       
      email: (value) => {
        if (!validator.isEmail(value)) {
          return `${value} is not a valid email.`
        }
      },
       
    lt: (value, props) => {
        // get the maxLength from component's props
        if (!value.toString().trim().length > props.maxLength) {
          // Return jsx
          return <span className="error">The value exceeded {props.maxLength} symbols.</span>
        }
      },
       
       password: (value, props, components) => {
        // NOTE: Tricky place. The 'value' argument is always current component's value.
        // So in case we're 'changing' let's say 'password' component - we'll compare it's value with 'confirm' value.
        // But if we're changing 'confirm' component - the condition will always be true
        // If we need to always compare own values - replace 'value' with components.password[0].value and make some magic with error rendering.
        if (value.length < 8 ) { // components['password'][0].value !== components['confirm'][0].value
          // 'confirm' - name of input
          // components['confirm'] - array of same-name components because of checkboxes and radios
          return <span className="error">Password must be 8 characters in length.</span>
        }
      },
}