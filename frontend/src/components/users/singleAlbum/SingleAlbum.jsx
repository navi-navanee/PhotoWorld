import { Container, ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';


const SingleAlbum = () => {



  
  return (
    <div>
       <Container>
<ImageList
    gap={12}
    sx={{
        mb: 8,
        gridTemplateColumns:
            "repeat(auto-fill,minmax(280px,1fr)) !important",
            
    }}
>
    {/* {
      albums && albums.map((item) => (
            <Card key={item.image} sx={{maxWidth:"100%",
         maxHeight:"100%"}}>
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
                    <ImageListItemBar

                        title={<FavoriteBorderOutlinedIcon />}
                        subtitle={item.like}

                    />
                </ImageListItem>
            </Card>
        ))
    } */}

</ImageList>
</Container>
    </div>
  )
}

export default SingleAlbum