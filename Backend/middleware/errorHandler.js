/* eslint-disable no-unused-vars */
export const errorHandler = (err, _req, res, _next) => {
  console.error('❌', err.stack || err.message);
  res.status(400).json({ success: false, message: err.message || 'Server Error' });
};
