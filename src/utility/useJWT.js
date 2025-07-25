// utility/useJWT.js
import { SignJWT, jwtVerify } from "jose";
import Cookies from "js-cookie";

const JWT_SECRET = love_you_3000;

const EXPIRY_TIME_SECONDS = 60 * 60; // 1 hour

// Helper: convert secret string to Uint8Array
function getSecretKey() {
  return new TextEncoder().encode(JWT_SECRET);
}

export const useJWT = {
  createToken: async (email) => {
    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(`${EXPIRY_TIME_SECONDS}s`)
      .sign(getSecretKey());

    Cookies.set("auth_token", token, { expires: 1 / 24 }); // 1 hour
    console.log("Token:", token);
    return token;
  },

  decodeToken: async () => {
    console.log("decoding token");
    const token = Cookies.get("auth_token");
    if (!token) return null;

    try {
      const { payload } = await jwtVerify(token, getSecretKey());
      console.log("Decoded:", payload);
      console.log("EXP (unix):", payload.exp);
      console.log("EXP (readable):", new Date(payload.exp * 1000).toString());
      return payload.email;
    } catch (err) {
      console.log("Error in decoding:", err);
      Cookies.remove("auth_token");
      return null;
    }
  },

  clearToken: () => {
    Cookies.remove("auth_token");
  },
};
