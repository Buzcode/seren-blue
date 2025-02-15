// utils/helpers.js
import bcrypt from "bcrypt";
const saltRounds = 10;

export const hashPassword = async (password) => { // <-- PUT 'export const' BACK HERE!
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

// module.exports = { hashPassword }; // REMOVE or COMMENT OUT this line
// exports.hashPassword = hashPassword; // REMOVE or COMMENT OUT this line

export const comparePassword = async (password, hashedPassword) => { // Keep this line as it is (ES module export)
  return await bcrypt.compare(password, hashedPassword);
};