import './step2.scss'


import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import ImageUpload from 'image-upload-react'
import 'image-upload-react/dist/index.css'
import { imageUpload } from '../../../util/imageUpload';
import Spinner from '../../spinner/Spinner'


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

const Step2 = (props) => {

    const { data, handleChange, next, back } = props;

    console.log("im data", data);

    const [imageSrc, setImageSrc] = useState()
    const [pic, setPic] = useState('')
    const [load, setLoad] = useState(false)

    //dump the image into cloudinary ImageUpload
    const postDetails = async (ProfilePicture) => {
        try {
            setLoad(true)
            const data = await imageUpload(ProfilePicture);
            setPic(data.secure_url.toString());
            console.log("im return", pic);
            setLoad(false)
        } catch (error) {
            console.log(error);
        }
    };


    const handleImageSelect = (e) => {
        console.log("helooo");
        setImageSrc(URL.createObjectURL(e.target.files[0]))
        postDetails(e.target.files[0])

    }

    console.log("im pic......", pic);
    data.image = pic


    // for wedding category
    const [selected, setSelected] = useState([]);
    data.category = selected


    if (load) {
        return <Spinner />
    }


    return (

        <section className='contact'>

            <div className='container contact__container'>
                <div className="contact__options">
                    <article className="contact__option">
                        <h2>Select Profile Pic</h2>
                        <ImageUpload
                            handleImageSelect={handleImageSelect}
                            imageSrc={imageSrc}
                            setImageSrc={setImageSrc}
                            style={{
                                width: 200,
                                height: 200,
                                background: 'green'
                            }}
                        />
                    </article>
                </div>
                {/* ==================END================ */}
                <form >
                    <h3>Overview</h3>
                    <textarea
                        name='overview'
                        id='' cols={30}
                        rows="7"
                        placeholder='Your message'
                        required
                        value={data.message}
                        onChange={handleChange}
                    ></textarea>
                    <h3>Location</h3>
                    <div className='location'>
                        <input
                            type="text"
                            name='address'
                            placeholder='ADDRESS '
                            value={data.address}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name='city'
                            placeholder='CITY'
                            value={data.city}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name='state'
                            placeholder='STATE'
                            value={data.state}
                            onChange={handleChange}
                        />
                    </div>
                    <h1>Service</h1>
                    <MultiSelect
                        options={options}
                        value={selected}
                        // onChange={setSelected}
                        onChange={setSelected}

                        labelledBy="Select" />


                    {/* <button type='submit' className='btn btn-primary' >Send Message</button> */}
                    <button style={{color:"blue" , height:"2rem"}}  onClick={back}>Back</button>
                    <button style={{color:"blue" , height:"2rem"}}  onClick={next}>Next</button>
                </form> 
            </div>
        </section>

    );
};
export default Step2;