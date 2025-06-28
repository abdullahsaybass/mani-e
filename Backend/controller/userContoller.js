import User from '../model/user.js';

// ✅ POST /api/user/address → Add new address
export const addAddress = async (req, res) => {
  const userId = req.user._id;
  const { name, phone, address, city, state, pincode, label } = req.body;

  if (!name || !phone || !address || !city || !state || !pincode) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.addresses.push({ name, phone, address, city, state, pincode, label });
    await user.save();

    return res.json({ success: true, message: 'Address added successfully', addresses: user.addresses });
  } catch (err) {
    console.error('❌ [addAddress] error:', err);
    return res.status(500).json({ success: false, message: 'Failed to add address' });
  }
};

// ✅ GET /api/user/address → Get all addresses
export const getAddresses = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).select('addresses');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    return res.json({ success: true, addresses: user.addresses });
  } catch (err) {
    console.error('❌ [getAddresses] error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch addresses' });
  }
};
