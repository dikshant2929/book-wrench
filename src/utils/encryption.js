"use strict";

const crypto = require("crypto");

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

let iv = Buffer.from(ENCRYPTION_KEY.slice(0, 16));

/**
 * Encrypting Data
 * @param {String}  - data to be encryted
 * @returns {String}
 */
function encrypt(text) {
  let cipher = crypto.createCipheriv(process.env.CRYPTO_MODE, Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

/**
 * Decrypting Data
 * @param {String}  - data to be decryted
 * @returns {String}
 */
function decrypt(text) {
  try {
    let textParts = text.split(":");
    let decryptIV = Buffer.from(textParts.shift(), "hex");
    let encrptedText = Buffer.from(textParts.join(":"), "hex");
    let decipher = crypto.createDecipheriv(process.env.CRYPTO_MODE, Buffer.from(ENCRYPTION_KEY), decryptIV);
    let decrypted = decipher.update(encrptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    return text;
    // throw new Error("Invalid data received");
  }
}

/**
 * Encrypting Object
 * @param {Object} - object to be checked
 * @param {Array} - keys to be checked for encrytion
 * @returns {Object}
 */
function encryptObj(obj, arrKeys) {
  for (let key of arrKeys) {
    if (key in obj) {
      if (obj[key]) {
        obj[key] = encrypt(obj[key]);
      }
    }
  }
  return obj;
}

/**
 * Decrypting Object
 * @param {Object} - object to be checked
 * @param {Array} - keys to be checked for Decrytion
 * @returns {Object}
 */
function decryptObj(obj, arrKeys) {
  for (let key of arrKeys) {
    if (key in obj) {
      if (obj[key]) {
        obj[key] = decrypt(obj[key]);
      }
    }
  }
  return obj;
}
/**
 * Encrypting Array of Object
 * @param {Array} - Array to be iterated for encryption
 * @param {Array} - keys to be checked for encryption
 * @returns {Array}
 */
function encryptArrObj(arr, arrKeys) {
  for (let obj of arr) {
    encryptObj(obj, arrKeys);
  }
  return arr;
}
/**
 * Decrypting Array of Object
 * @param {Array} - Array to be iterated for decryption
 * @param {Array} - keys to be checked for decryption
 * @returns {Array}
 */
function decryptArrObj(arr, arrKeys) {
  for (let obj of arr) {
    decryptObj(obj, arrKeys);
  }
  return arr;
}
module.exports = { encrypt, decrypt, encryptObj, decryptObj, decryptArrObj, encryptArrObj };
