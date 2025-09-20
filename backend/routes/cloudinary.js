import express from 'express';
import multer from 'multer';
import cloudinary from '../utils/image.js';

const router = express.Router();
const upload = multer({ dest: "uploads/" });


router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "products",
            transformation: [
              {
                effect: "gen_background_replace:prompt_white background clean product shot"
              }
            ]
        });
        
        res.json({ secure_url: result.secure_url });
    } catch (err) {
        console.log("Upload error:", err);
        res.status(500).json({ error: "Image upload failed" });
    }
});

export default router;