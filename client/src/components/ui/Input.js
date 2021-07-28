import React, { useState } from 'react'
import { TextField } from '@material-ui/core';

function Input({ validate, ...props }) {

    const [errorMessage, setErrorMessage] = useState(undefined);
    
    const onBlur = e => {
        if (validate) {
            setErrorMessage(validate(e.target.value));
        }
    }
    
    return (
        <TextField  {...props} onBlur={onBlur} error={errorMessage} helperText={errorMessage||props.helperText}/>
    )
}

export default Input
