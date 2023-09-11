import jwt from "jsonwebtoken";

import HttpError from "../utils/http.error.js";

export default (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    // the Authorization string looks like this:  'Bearer TOKEN'
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.statusMessage = "Authentication failed!";
      return res.sendStatus(401);
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = {
      userId: decodedToken.userId,
      nom: decodedToken.nom,
      email: decodedToken.email,
      telephone: decodedToken.telephone,
    };
    next();
  } catch (err) {
    res.statusMessage = "Authentication failed!";
    return res.sendStatus(401);
  }
};
