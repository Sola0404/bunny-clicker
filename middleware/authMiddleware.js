import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const { username, id } = verifyJWT(token);
    req.user = { username, id };
    next();
  } catch (error) {
    res.sendStatus(403);
  }
};

