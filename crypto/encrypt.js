const CryptoJS = require("crypto-js");
const secretKey = process.env.CRYPTOJS_KEY;

const enc = plainText => {
  const b64 = CryptoJS.AES.encrypt(plainText, secretKey).toString();
  const e64 = CryptoJS.enc.Base64.parse(b64);
  const eHex = e64.toString(CryptoJS.enc.Hex);
  return eHex;
}

module.exports = enc;
