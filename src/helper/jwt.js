import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const generateToken = (payload, options) => {
  return jwt.sign(payload, process.env.ACCESSTOKENKEY, options);
};



const token = {
  generateToken,
};

export default token;
