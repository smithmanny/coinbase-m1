import CryptoJS from "crypto-js"

const crypt = {
  secret: process.env.BLITZ_PUBLIC_ENCRYPTION_KEY,
  encrypt: function (clear) {
    const cipher = CryptoJS.AES.encrypt(clear, crypt.secret).toString();
    return cipher;
  },
  decrypt: function (cipher) {
    let decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    return decipher;
  }
};

export default crypt