import React from 'react'
import './slider.scss'
import { makeStyles } from '@mui/styles';
import { Slider } from '@mui/material';


const useStyle = makeStyles({
    root: {
      width: '100%',
    },
    thumb: {
      color: '#000',
    },
    rail: {
      color: `rgba(0, 0, 0, 0.26)`,
    },
    track: {
      color: '#000',
    },
  });

const SliderProton = ({value,changedPrice}) => {

    const classes = useStyle();

  return (
    <div className={classes.root}>

        <Slider
        value={value}
        onChange={changedPrice}
        valueLabelDisplay="on"
        min={1000}
        max={100000}
        classes={
            {
                thumb:classes.thumb,
                rail:classes.rail,
                track:classes.track
            }
        }
        />

    </div>

  )
}

export default SliderProton