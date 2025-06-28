import Product from '../model/product.js';

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      subcategory, // ✅ NEW
      brand,
      gender,
      date,
      colors,      // ✅ NEW
      variants,    // JSON string or array
    } = req.body;

    // Validate main image
    if (!req.files?.mainImage || !req.files.mainImage[0]) {
      return res.status(400).json({ success: false, message: 'mainImage is required.' });
    }

    const mainImage = req.files.mainImage[0].path;
    const images = (req.files.images || []).map((f) => f.path);

    if (images.length > 4) {
      return res.status(400).json({ success: false, message: 'Maximum 4 images allowed.' });
    }

    const product = await Product.create({
      title,
      description,
      price,
      category,
      subcategory, // ✅ added
      brand,
      gender,
      date,
      colors: typeof colors === 'string' ? JSON.parse(colors) : colors, // ✅ parse if needed
      mainImage,
      images,
      variants: typeof variants === 'string' ? JSON.parse(variants) : variants, // ✅ parse if needed
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    console.error('Create Product Error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {};

    // Image updates
    if (req.files?.mainImage) {
      updateData.mainImage = req.files.mainImage[0].path;
    }

    if (req.files?.images) {
      const imgs = req.files.images.map((f) => f.path);
      if (imgs.length > 4) {
        return res.status(400).json({ success: false, message: 'Maximum 4 images allowed.' });
      }
      updateData.images = imgs;
    }

    const fields = [
      'title',
      'description',
      'price',
      'category',
      'subcategory', // ✅ added
      'brand',
      'gender',
      'date',
      'variants',
      'colors', // ✅ added
    ];

    fields.forEach((field) => {
      if (req.body[field]) {
        if (field === 'variants' || field === 'colors') {
          updateData[field] = JSON.parse(req.body[field]);
        } else {
          updateData[field] = req.body[field];
        }
      }
    });

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, product });
  } catch (err) {
    console.error('Update Product Error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET SINGLE PRODUCT
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
