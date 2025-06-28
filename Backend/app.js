
// import express from 'express';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import connectDB from './config/mongobd.js';

// import productRoutes from './routes/product.js';
// import orderRoutes   from './routes/order.js';
// import authRoutes    from './routes/auth.js';
// import cartRoutes    from './routes/cart.js';
// // import userRoutes from './routes/user.js'; // optional

// dotenv.config({ path: './.env' });

// // ✅ Resolve __dirname in ES Module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname  = path.dirname(__filename);

// // ✅ Connect to MongoDB
// connectDB();

// const app = express();

// // ✅ Middleware
// app.use(cors({
//   origin: process.env.CLIENT_URL || 'http://localhost:5173',
//   credentials: true,
// }));
// app.use(express.json()); // Parses JSON body
// app.use(cookieParser()); // For reading cookies

// // ✅ Serve static files (uploaded images)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // ✅ API Routes
// app.use('/api/auth',     authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/cart',     cartRoutes);
// app.use('/api/orders',   orderRoutes);
// // app.use('/api/user',  userRoutes); // Optional

// // ✅ Health Check Route
// app.get('/', (req, res) => {
//   res.send(`✅ Server running on port ${process.env.PORT || 8000}`);
// });

// // ✅ Start the Server
// const PORT = process.env.PORT || 8000;
// const NODE_ENV = process.env.NODE_ENV || 'development';

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT} in ${NODE_ENV} mode`);
// });

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/mongobd.js';

import productRoutes from './routes/product.js';
import orderRoutes   from './routes/order.js';
import authRoutes    from './routes/auth.js';
import cartRoutes    from './routes/cart.js';
import userRoutes    from './routes/user.js'; // ✅ added this

dotenv.config({ path: './.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

connectDB();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ API Routes
app.use('/api/auth',     authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart',     cartRoutes);
app.use('/api/orders',   orderRoutes);
app.use('/api/user',     userRoutes); // ✅ now active

app.get('/', (req, res) => {
  res.send(`✅ Server running on port ${process.env.PORT || 8000}`);
});

const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT} in ${NODE_ENV} mode`);
})
