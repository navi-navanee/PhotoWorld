import { Button, Card, Container, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { like, likeData, singleFetchData, unlike } from '../../../features/user/details/userSlice';
import { useState } from 'react';
import { useEffect } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';


const AlbumList = ({ post }) => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth);
    const [unLikeAction, setUnlikeAction] = useState(post.likes.includes(user._id))
    const [likeCount, setLikeCount] = useState(post?.likes?.length)

    console.log("useruseruser", user);

    const likeaction = (e) => {
        const data = {
            _id: e,
            userId: user._id
        }
        dispatch(like(data))
        setLikeCount(likeCount + 1)
        setUnlikeAction(true)
    }

    const unlikeaction = (e) => {
        const data = {
            _id: e,
            userId: user._id
        }
        dispatch(unlike(data))
        setLikeCount(likeCount - 1)
        setUnlikeAction(false)
    }

    useEffect(() => {

    }, [dispatch])

    return (
        <>
            <Card key={post.image} sx={{
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
                        title={post.category ? post.category : 'NO titlle'}
                    />
                    <img
                        src={post.image}
                        alt={post.category}
                        loading="lazy"
                        style={{ cursor: "pointer" }}
                    />
                    <div style={{ display: 'flex' }}>
                        <ImageListItemBar
                            style={{ marginBottom: "1rem" }}
                            title= {unLikeAction ? (
                            <span onClick={() => unlikeaction(post._id)} className="liketext">
                                <ThumbUpIcon style={{ cursor: "pointer" }} sx={{ color: 'red' }} />
                                {likeCount}
                            </span>
                        ) : (
                            <span onClick={() => likeaction(post._id)} className="liketext">
                                <ThumbUpIcon style={{ cursor: "pointer" }} />
                                {likeCount}
                            </span>
                        )}
                        //     subtitle={likeCount}
                        // actionIcon={
                        //     <IconButton
                        //         sx={{ color: 'white' }}
                        //         aria-label={`star ${post.title}`}
                        //     >
                        //         <ThumbDownIcon onClick={() => unlikeaction(post._id)} />
                        //     </IconButton>
                        // }
                        />
                        {/* {item.likes.includes(user?._id)
                                            ? <Button>{<ThumbUpIcon />}</Button>
                                            : <Button onClick={() => unlike(item._id)}>{<ThumbDownIcon />}</Button>
                                        } */}
                       
                    </div>
                </ImageListItem>
            </Card>
        </>
    )
}

export default AlbumList