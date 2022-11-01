import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dTodoitem";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    Order: '',
    Name: '',
    Description: '',
    IsComplete: ''
}

const DTodoitemForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Order' in fieldValues)
            temp.Order = fieldValues.Order ? "" : "This field is required."
        if ('Name' in fieldValues)
            temp.Name = fieldValues.Name ? "" : "This field is required."
        if ('Description' in fieldValues)
            temp.Description = fieldValues.Description ? "" : "This field is required."
        if ('IsComplete' in fieldValues)
            temp.IsComplete = fieldValues.IsComplete ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId == 0)
                props.createDTodoitem(values, onSuccess)
            else
                props.updateDTodoitem(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.dTodoitemList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <p>Olsen</p>
            <Grid container>
                <Grid item xs={4}>
                    <TextField
                        name="Order"
                        variant="outlined"
                        label="Order"
                        value={values.Order}
                        onChange={handleInputChange}
                        {...(errors.Order && { error: true, helperText: errors.Order })}
                    />
                    <TextField
                        name="Name"
                        variant="outlined"
                        label="Name"
                        value={values.Name}
                        onChange={handleInputChange}
                        {...(errors.Name && { error: true, helperText: errors.Name })}
                    />
                    <TextField
                        name="Description"
                        variant="outlined"
                        label="Description"
                        value={values.Description}
                        onChange={handleInputChange}
                        {...(errors.Description && { error: true, helperText: errors.Description })}
                    />
                    <TextField
                        name="IsComplete"
                        variant="outlined"
                        label="IsComplete"
                        value={values.IsComplete}
                        onChange={handleInputChange}
                        {...(errors.IsComplete && { error: true, helperText: errors.IsComplete })}
                    />
                </Grid>
                <Grid item xs={4}>

                    <TextField
                        name="Order"
                        variant="outlined"
                        label="Order"
                        value={values.Order}
                        onChange={handleInputChange}
                        {...(errors.Order && { error: true, helperText: errors.Order })}
                    />
                    <TextField
                        name="Name"
                        variant="outlined"
                        label="Name"
                        value={values.Name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="Description"
                        variant="outlined"
                        label="Description"
                        value={values.Description}
                        onChange={handleInputChange}
                    />
                    <TextField
                        name="IsComplete"
                        variant="outlined"
                        label="IsComplete"
                        value={values.IsComplete}
                        onChange={handleInputChange}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    dTodoitemList: state.dTodoitem.list
})

const mapActionToProps = {
    createDTodoitem: actions.create,
    updateDTodoitem: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DTodoitemForm));