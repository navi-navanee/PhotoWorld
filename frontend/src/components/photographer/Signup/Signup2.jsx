import { Avatar, Button, Grid, Paper, Step, StepLabel, Stepper, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MultiSelect } from 'react-multi-select-component'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { form2 } from '../../../features/photographer/auth/photographerauthSlice'
import './step2.scss'

const options = [
    { label: "wedding ", value: "grapes" },
    { label: "Babies&kids", value: "Babies&kids" },
    { label: "Special Occation", value: "Special Occation" },
    { label: "Commercial", value: "Commercial" },
    { label: "Corporative event", value: "Corporative even" },
    { label: "Fashion Portfolio", value: "Fashion Portfolio" },
    { label: "Nature", value: "Nature" },
    { label: "Travel", value: "Travel" },
];



const steps = [
    'Basic Information',
    'Contact Details',
    'Payment',
];
const Signup2 = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "all" });


    // for wedding category
    const [selected, setSelected] = useState([]);

    const category = selected



    const onSubmit = (e) => {
        console.log("helooooo");
        const { overview, address, city, state,phonenumber } = e;

        const userData = {
            overview,
            address,
            city,
            state,
            category,
            phonenumber
        }
        console.log("im userData", userData);
        dispatch(form2(userData));
        navigate('/photographer/signup3');
    }
    const paperStyle = { padding: 20, height: "80vh", width: 400, margin: "20px auto" }


    return (
        <div>
                  <Box sx={{ width: '100%' }}>
        <Stepper style={{marginTop:"2rem"}} activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel >{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
            <form >
                <Grid >
                    <Paper component="form" elevation={10} style={paperStyle}  >

                        <h3>Overview</h3>
                        <TextField
                            id="filled-multiline-static"
                            label="Multiline"
                            multiline
                            rows={4}
                            fullWidth
                            defaultValue="Default Value"
                            variant="filled"
                            {...register("overview", { required: true })}

                        />
                        <h3 style={{ marginTop: "1rem" }}>Service</h3>
                        <div className='multi'>
                            <MultiSelect
                                options={options}
                                value={selected}
                                onChange={setSelected}
                                labelledBy="Select" />

                        </div>
                        <h3 style={{ marginTop: "1rem" }}>Location</h3>
                        <div className='location'>
                            <TextField
                                type="text"
                                name='address'
                                placeholder='ADDRESS '
                                fullWidth
                                {...register("address", { required: true })}
                            />
                            <TextField
                                type="text"
                                name='city'
                                placeholder='CITY'
                                fullWidth
                                {...register("city", { required: true })}
                            />
                            <TextField
                                type="text"
                                name='state'
                                placeholder='STATE'
                                fullWidth
                                {...register("state", { required: true })}
                            />
                            <TextField
                                type="text"
                                name='phonenumber'
                                placeholder='PHONENUMBER'
                                fullWidth
                                {...register("phonenumber", { required: true })}
                            />
                        </div>

                        {/* <button type='submit' className='btn btn-primary' >Send Message</button> */}
                        <div style={{ textAlign: "center" }}>
                            <Button style={{ marginTop: ".5rem" }} onClick={handleSubmit(onSubmit)} variant='contained' size='large' fullWidth >Next</Button>
                        </div>
                    </Paper>
                </Grid>

            </form>
        </div>
    )
}

export default Signup2
