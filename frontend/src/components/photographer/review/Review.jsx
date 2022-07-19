import { Button, Container, Rating, TextField } from '@mui/material'
import './review.scss'
import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

const Review = () => {
  const [open, setOpen] = React.useState(false);
  const [submit, setSubmit] = useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSubmit()
  }


  return (
    <div>
      <Container>
        <div className='head'>
          <h2>Review</h2>
          <div>
            <Button variant="outlined" onClick={handleClickOpen}>
              Submit your review
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Review "}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Please put your valuable review...
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Comment"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <Rating name="size-medium" defaultValue={2} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>

        <div className='review'>

          <div className='reviews'>
            <div>
              <h1>Navaneeth</h1>
              <div>11/02/1999</div>
            </div>
            <div>V felt so happy for choosing shadows for our wedding photography, u guys captured Al our beautiful moments & they made it very difficult for us to select some for a wedding album ??.Words can't describe the professionalism,talent and passion behind </div>
            <div>
              <Rating name="size-medium" defaultValue={2} />
            </div>
          </div>

          <div className='reviews'>
            <div>
              <h1>Navaneeth</h1>
              <div>11/02/1999</div>
            </div>
            <div>V felt so happy for choosing shadows for our wedding photography, u guys captured Al our beautiful moments & they made it very difficult for us to select some for a wedding album ??.Words can't describe the professionalism,talent and passion behind </div>
            <div>
              <Rating name="size-medium" defaultValue={2} />
            </div>
          </div>


        </div>
      </Container>
    </div>
  )
}

export default Review