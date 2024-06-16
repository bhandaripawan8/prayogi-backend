

import app from './app.js'
import {v2 as cloudinary} from 'cloudinary';
          
const cloudinaryConnection = () => {
    try {
        cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_NAME, 
            api_key: process.env.CLOUDINARY_KEY, 
            api_secret: process.env.CLOUDINARY_API 
          })
          console.log('Cloudinary connected')
       } catch (error) {
        console.error('Error connecting to cloudinary', error)
       }
}

cloudinaryConnection();

app.listen(process.env.PORT, () =>{
    console.log(`server running on port ${process.env.PORT}`);
})