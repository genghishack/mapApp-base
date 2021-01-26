import React from 'react';
import './EnterInfo.scss';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';

const EnterInfo = () => {
    return (
        <div className="EnterInfo">
            <h1>Enter Info</h1>

            <FormControl>
                <InputLabel htmlFor="address">Address</InputLabel>
                <Input id="address" aria-describedby="address input" />
            </FormControl>

            <Button variant="contained" color="primary">
                Submit
            </Button>
        </div>
    )
}

export default EnterInfo;
