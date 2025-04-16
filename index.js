const { encrypt, decrypt } = require('./script');

const samplePayload = { userId: 101, name: 'Alice' };

const encryptedToken = encrypt(samplePayload);
console.log('🔐 Encrypted Token:', encryptedToken);

const decryptedData = decrypt(encryptedToken);
console.log('🔓 Decrypted Payload:', decryptedData);
