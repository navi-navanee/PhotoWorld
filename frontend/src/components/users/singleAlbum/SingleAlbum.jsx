import { Button, Card, Container, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { like, likeData, singleFetchData } from '../../../features/user/details/userSlice';
import { useState } from 'react';
import { useEffect } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';


const SingleAlbum = () => {
    const image = useSelector(singleFetchData)
    const albums = image ? image.data : ''
    const dispatch = useDispatch()
    console.log("myreeeee", albums);
    //   const like =useSelector(likeData)

    const [data, setData] = useState([])

    const { user } = useSelector((state) => state.auth);

    console.log("useruseruser", user);

    const click = (e) => {
        const data = {
            _id: e,
            userId: user._id
        }

        console.log("im clicked", data);
        dispatch(like(data))
    }

    useEffect(() => {

    }, [dispatch])



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
                        albums && albums.map((item) => (
                            <Card key={item.image} sx={{
                                maxWidth: "100%",
                                maxHeight: "100%"
                            }}>
                                <ImageListItem sx={{ height: '100% !import' }}>
                                    <ImageListItemBar
                                        position='top'
                                        sx={{
                                            background:
                                                'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                                        }}
                                        title={item.category ? item.category : 'NO titlle'}
                                    />
                                    <img
                                        src={item.image}
                                        alt={item.category}
                                        loading="lazy"
                                        style={{ cursor: "pointer" }}
                                    />
                                    <div style={{ display: 'flex' }}>

                                        <ImageListItemBar
                                            style={{ marginBottom: "1rem" }}
                                            title={<FavoriteBorderOutlinedIcon style={{ color: "red" }} onClick={() => click(item._id)} />}

                                            subtitle={item.likes?.length}
                                        />
                                        {item.likes.includes(user?._id)
                                            ? <Button>{<ThumbUpIcon />}</Button>
                                            : <Button onClick={() => click(item._id)}>{<ThumbDownIcon />}</Button>
                                        }
                                    </div>
                                </ImageListItem>
                            </Card>
                        ))
                    }
                </ImageList>
            </Container>
        </div>
    )
}

export default SingleAlbum