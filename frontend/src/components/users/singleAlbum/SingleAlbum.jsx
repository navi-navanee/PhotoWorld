import { Button, Card, Container, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { like, likeData, singleFetchData, unlike } from '../../../features/user/details/userSlice';
import { useState } from 'react';
import { useEffect } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AlbumList from './AlbumList';


const SingleAlbum = () => {
    const image = useSelector(singleFetchData)
    const albums = image ? image.data : ''


    //   const like =useSelector(likeData)
    return (
        <div>
            <Container>
                <ImageList
                    gap={12}
                    sx={{
                        mb: 8,
                        gridTemplateColumns:
                            "repeat(auto-fill,minmax(280px,1fr)) !important",
                    }} >
                    {
                        albums && albums.map((post) => (
                            <AlbumList post ={post}/>
                        ))
                    }
                </ImageList>
            </Container>
        </div>
    )
}

export default SingleAlbum