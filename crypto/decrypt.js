const CryptoJS = require("crypto-js");
const secretKey = process.env.CRYPTOJS_KEY;

const dec = cipherText => {
    const reb64 = CryptoJS.enc.Hex.parse(cipherText);
    const bytes = reb64.toString(CryptoJS.enc.Base64);
    const decrypt = CryptoJS.AES.decrypt(bytes, secretKey);
    const plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
  }

  module.exports = dec;