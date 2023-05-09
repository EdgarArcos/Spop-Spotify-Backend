const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});

const uploadImg = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: "Profile_Picture_Spop",
    });
};

const deleteImg = async (public_id) => {
    return await cloudinary.uploader.destroy(public_id);
};

const uploadImgSong = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        folder: "Artist_Songs",
    });
};




const uploadSong = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        resource_type: "video",
        folder: "Artist_Songs",
    });
};

const deleteSongCloud = async id => {
    return await cloudinary.uploader.destroy(id)
}

module.exports = { uploadImg, uploadSong, deleteSongCloud, uploadImgSong, deleteImg  };