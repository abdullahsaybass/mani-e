import React, { useState, useContext } from 'react';
import { FiUpload } from 'react-icons/fi';
import { AppContext } from '../../context/AppContext';
import './AddProduct.css';

const SIZES = ['EU - 38.5', 'EU - 39', 'EU - 40', 'EU - 41.5', 'EU - 42', 'EU - 43'];

export default function AddProduct() {
  const { createProduct } = useContext(AppContext);

  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [colors, setColors] = useState([]);

  const [form, setForm] = useState({
    name: '',
    category: '',
    subcategory: '',
    gender: 'Male',
    brand: '',
    description: '',
    price: '',
    stock: '',
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4 - imageFiles.length);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...previews]);
    setImageFiles((prev) => [...prev, ...files]);
  };

  const removeImage = (idx) => {
    setImages(images.filter((_, i) => i !== idx));
    setImageFiles(imageFiles.filter((_, i) => i !== idx));
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const addCustomColor = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const newColor = e.target.value.trim();
      if (!colors.includes(newColor)) {
        setColors((prev) => [...prev, newColor]);
      }
      e.target.value = '';
    }
  };

  const handleSubmit = async () => {
    const { name, category, gender, description, price, stock } = form;

    if (!name || !category || !gender || !description || !price || !stock) {
      alert('Please fill all required fields.');
      return;
    }

    if (colors.length === 0) {
      alert('Please add at least one color.');
      return;
    }

    if (imageFiles.length === 0) {
      alert('Please upload at least one image.');
      return;
    }

    try {
      const variants = colors.map((color) => ({
        color,
        quantity: Number(stock),
        price: Number(price),
        ...(selectedSize ? { size: selectedSize } : {}), // include size only if selected
      }));

      const productData = {
        title: name,
        description,
        price: Number(price),
        category,
        subcategory: form.subcategory || undefined,
        gender,
        brand: form.brand || undefined,
        mainImage: imageFiles[0],
        images: imageFiles.slice(1),
        variants,
      };

      await createProduct(productData);
      alert('Product added successfully!');

      setForm({
        name: '',
        category: '',
        subcategory: '',
        gender: 'Male',
        brand: '',
        description: '',
        price: '',
        stock: '',
      });
      setImages([]);
      setImageFiles([]);
      setColors([]);
      setSelectedSize('');
    } catch (err) {
      alert('Error adding product: ' + err.message);
    }
  };

  return (
    <div className="add-product-page extended-height">
      <h1 className="page-title">Add Product</h1>
      <div className="form-grid">
        <div className="panel panel-left">
          <label className="field small-text">
            <span>Product name <b>*</b></span>
            <input type="text" name="name" value={form.name} onChange={handleChange} />
          </label>

          <div className="row two-cols">
            <label className="field small-text">
              <span>Category <b>*</b></span>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="">Choose category</option>
                <option>Clothing</option>
                <option>Shoes</option>
                <option>Accessories</option>
              </select>
            </label>

            <label className="field small-text">
              <span>Subcategory</span>
              <input
                type="text"
                name="subcategory"
                value={form.subcategory}
                onChange={handleChange}
                placeholder="E.g., T-Shirts, Sneakers"
              />
            </label>
          </div>

          <label className="field small-text">
            <span>Target Audience <b>*</b></span>
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option>Male</option>
              <option>Female</option>
              <option>Unisex</option>
              <option>Kids</option>
            </select>
          </label>

          <label className="field small-text">
            <span>Brand <small>(optional)</small></span>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="Type brand name"
            />
          </label>

          <label className="field small-text">
            <span>Description <b>*</b></span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              maxLength={100}
            />
          </label>
        </div>

        <div className="panel panel-right">
          <div className="field upload-field small-text">
            <span>Upload Images</span>
            <div className="upload-grid">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="thumb">
                  {images[i] ? (
                    <>
                      <img src={images[i]} alt={`img-${i}`} />
                      <button className="remove" onClick={() => removeImage(i)}>×</button>
                    </>
                  ) : (
                    i === images.length && (
                      <label className="upload-thumb">
                        <FiUpload size={20} />
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        <small>Upload</small>
                      </label>
                    )
                  )}
                </div>
              ))}
            </div>
            <small className="hint">Add 4 high-quality images.</small>
          </div>

          <div className="field small-text">
            <span>Select Size <small>(optional)</small></span>
            <select value={selectedSize} onChange={(e) => handleSizeSelect(e.target.value)}>
              <option value="">Select size</option>
              {SIZES.map((sz) => (
                <option key={sz} value={sz}>{sz}</option>
              ))}
            </select>
            <div className="size-list">
              {SIZES.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  className={selectedSize === sz ? 'size-btn active' : 'size-btn'}
                  onClick={() => handleSizeSelect(sz)}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          <div className="row two-cols">
            <div className="field small-text">
              <span>Price <b>*</b></span>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter product price"
              />
            </div>

            <div className="field small-text">
              <span>Stock <b>*</b></span>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="Enter stock quantity"
              />
            </div>
          </div>

          <div className="field small-text">
            <span>Add Colors</span>
            <input
              type="text"
              className="color-input-box"
              placeholder="Type color & press Enter"
              onKeyDown={addCustomColor}
            />
            <div className="color-options">
              {colors.map((color) => (
                <div key={color} className="color-btn">{color}</div>
              ))}
            </div>
          </div>

          <div className="footer-buttons">
            <button className="btn primary" onClick={handleSubmit}>Add product</button>
            <button className="btn outline">Save product</button>
            <button className="btn schedule">Schedule</button>
          </div>
        </div>
      </div>
    </div>
  );
}
