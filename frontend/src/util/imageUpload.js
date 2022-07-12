import axios from "axios";

export const imageUpload =async  (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const formData = new FormData();
      formData.append("file", pics);
      formData.append("upload_preset", "photoworld");
      formData.append("cloud_name", "dsulc0kkb");
     const {data} = await axios.post("https://api.cloudinary.com/v1_1/dsulc0kkb/image/upload",formData)
     if(data){
        return data;
  
     }
    } else {
      return console.log("picture is not uploaded");
    }
  };