import React from 'react'
import './widget.scss'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import CameraFrontIcon from '@mui/icons-material/CameraFront';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const Widget = ({ type , Total}) => {

    console.log("im the toal count",Total);

    let data;

    const amount = 1000
    const diff = 20

    switch (type) {
        case 'user':
            data = {
                title: 'USERS',
                isMoney: false,
                link: "see all users",
                icon: <PersonOutlineRoundedIcon className='icon' 
                style={{
                    color:"crimson",
                    backgroundColor: "lightblue"
                }}
                />,
            }
            break;
        case 'Photographer':
            data = {
                title: 'PHOTOGRAPHERS',
                isMoney: false,
                link: "see all photographers",
                icon: <CameraFrontIcon className='icon'
                
                style={{
                    color:"orange",
                    backgroundColor: "yellow"
                }}/>,
            }
            break;
        case 'Income':
            data = {
                title: 'INCOME',
                isMoney: true,
                link: "total earnings",
                icon: <CurrencyRupeeIcon className='icon' 
                style={{
                    color:"lightgreen",
                    backgroundColor: "red"
                }}/>,
            }
            break;

        default:
            break;
    }


    return (
        <div className='widgets'>
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{Total?.data}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage negetive">
                    <KeyboardArrowUpRoundedIcon />
                    {diff} %
                </div>
                {data.icon}
            </div>
        </div>
    )
}

export default Widget