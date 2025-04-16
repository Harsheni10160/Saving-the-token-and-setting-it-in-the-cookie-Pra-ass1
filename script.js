const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_SECRET = 'my_jwt_secret'; // Use env vars in real projects
const ENCRYPTION_KEY = crypto.randomBytes(32); // 32 bytes for aes-256
const ALGORITHM = 'aes-256-cbc'; // Symmetric encryption
const IV = crypto.randomBytes(16); // Initialization Vector (16 bytes)

const encrypt = (payload) => {
  // Step 1: Create JWT
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  // Step 2: Encrypt JWT
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, IV);
  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // Return encrypted token and IV (needed for decryption)
  return {
    token: encrypted,
    iv: IV.toString('hex'),
  };
};

const decrypt = ({ token, iv }) => {
  try {
    // Step 1: Decrypt JWT
    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(token, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    // Step 2: Verify & decode JWT
    const decoded = jwt.verify(decrypted, JWT_SECRET);
    console.log('✅ Success:', decoded);
    return decoded;
  } catch (err) {
    console.error('❌ Decryption/Verification Failed:', err.message);
    return null;
  }
};

module.exports = {
  encrypt,
  decrypt,
};
