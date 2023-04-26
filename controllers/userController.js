const User = require("../models/User")
const { uploadImage, deleteImage } = require ("../utils/cloudinary");
const fs = require("fs-extra");


const editImage = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findOne({ _id: userId });
        const resultToUpload = await uploadImage(req.files.file.tempFilePath);
        const { public_id, secure_url } = resultToUpload;
        const imgToDelete = user.img.public_id;

        user.img.public_id = public_id;
        user.img.secure_url = secure_url;

        if (imgToDelete) {
            await deleteImage(imgToDelete);
        }

        await user.save();


        await fs.unlink(req.files.file.tempFilePath);

        return res.status(200).json({
        ok: true,
        img: user.img.secure_url,
        });
    } catch (error) {
        console.log(error);
        return res.status(503).json({
        ok: false,
        msg: "Something happened",
        });
    }
};

module.exports = {    
    editImage
};