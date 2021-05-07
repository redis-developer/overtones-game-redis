import bcrypt from "bcrypt-nodejs";
import jwt from "jwt-simple";

export function generateToken(userId: string) {
  const timestamp = new Date().getTime();
  return jwt.encode(
    { sub: userId, iat: timestamp },
    process.env.SESSION_SECRET
  );
}

export function decodeToken(token: string) {
  try {
    const decoded = jwt.decode(token, process.env.SESSION_SECRET);
    return decoded?.sub || null;
  } catch (e) {
    return null;
  }
}

export const hashPassword = (password: string) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
