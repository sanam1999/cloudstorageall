
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');
const {config,params } = require('../config');
const upload = multer({ storage: multer.memoryStorage() }); 



const uploadImageToStorage = async (imageFile, type) => {
    try {
        // Check if the file type is allowed
        if (!params.allowedFormats.includes(imageFile.mimetype.split('/')[1])) {
            console.log('File type not allowed');
            throw new Error('File type not allowed');
        }

        // Create a new FormData object
        const formData = new FormData();
        formData.append(type, imageFile.buffer, {
            filename: imageFile.originalname, 
            contentType: imageFile.mimetype, 
        });

        // Forward the image to storage.com
        const storageResponse = await axios.post('http://localhost:3001/upload', formData, {
            headers: {

                'secret': config.Secret,
                'key': config.Key,
                'folder': config.folder,
                'types':type,
                ...formData.getHeaders(),
            },
            
        });
  
            return storageResponse.data;
    
    } catch (error) {
        console.error('Error uploading image to cloudstorage.com:', error.response.data.error);
        console.error(error.message)
        return error.response.data
    }
};

const deleteImageformStorage = async (url) => {
    try {
        const storageResponse = await axios.delete(`http://localhost:3001/upload/image/api`, {
            headers: {
                'secret': config.Secret,
                'key': config.Key,
                'folder': config.folder,
                'Content-Type': 'application/json',
            },
            data: { imageUrl: url }, // <-- Pass data here
        });
        return storageResponse.data;
    } catch (error) {

        console.error('Error deleting image from storage:', error.response?.data || error.message);
        throw new Error(`Failed to delete image: ${error.message}`);
    }
};


module.exports = {
  uploadImageToStorage,
  deleteImageformStorage,
  upload,
};