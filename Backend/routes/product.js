import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct
} from '../controller/productController.js';

const router = express.Router();

// Ensure /uploads exists
const uploadDir = path.join(path.resolve(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Multer config
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// CREATE
router.post(
  '/',
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 4 }
  ]),
  createProduct
);

// GET ALL
router.get('/', getProducts);

// GET SINGLE
router.get('/:id', getSingleProduct);

// UPDATE
router.put(
  '/:id',
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 4 }
  ]),
  updateProduct
);

export default router;
