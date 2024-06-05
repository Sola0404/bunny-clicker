import { verifyJWT } from "../utils/tokenUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("Authentication invalid, you need to login first");
  }
  try {
    const { username, id } = verifyJWT(token);
    req.user = { username, id };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid, you need to login first");
  }
};

