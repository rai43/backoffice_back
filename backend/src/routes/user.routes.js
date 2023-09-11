import express from "express";
import { check, param } from "express-validator";

import checkAuthentication from "../middlewares/check.authentication.js";
import userController from "../controllers/user.controller.js";
const router = express.Router();

/**
 * @openapi
 * '/api/user/authenticate/login':
 *  post:
 *     tags:
 *     - User
 *       - Authentication
 *     summary: Logs in a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginUserResponse'
 *      400:
 *        description: Bad request
 *      403:
 *        description: Forbidden
 *      404:
 *        description: User not found
 *      500:
 *        description: Server side error
 */
router.post(
  "/authenticate/login",
  [
    check("email").isEmail().escape(),
    check("password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      )
      .escape(),
  ],
  userController.login,
);

// To check if the user is authenticated
router.use(checkAuthentication);

/**
 * @openapi
 * '/api/user/get-users/{active}/{inactive}/{from}/{limit}/{searchPattern}':
 *  get:
 *    tags:
 *    - User
 *    summary: Get all users
 *    parameters:
 *      - name: active
 *        in: path
 *        description: Tells if we have to fetch active users
 *        required: true
 *      - name: inactive
 *        in: path
 *        description: Tells if we have to fetch inactive users
 *        required: true
 *      - name: from
 *        in: path
 *        description: Tells from where the fetch has to start from
 *        required: true
 *      - name: limit
 *        in: path
 *        description: Tells the maximum users to be fetched
 *        required: true
 *        default: 10
 *      - name: searchPattern
 *        in: path
 *        description: Uses the search pattern to look for users
 *        required: true
 *        default: "undefined"
 *    responses:
 *      200:
 *        description: Get all users depending on the params
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUsersResponse'
 *      400:
 *        description: Invalid params passed
 *      401:
 *        description: Unauthorized, Not authenticated
 *      403:
 *        description: Forbidden
 *      500:
 *        description: Server side error
 */
router.get(
  "/get-users/:active/:inactive/:from/:limit/:searchPattern",
  [
    param("active").isBoolean().escape(),
    param("inactive").isBoolean().escape(),
    param("from").isInt().notEmpty().escape(),
    param("limit").isInt().default(10).notEmpty().escape(),
    param("searchPattern").isString().default("undefined").escape(),
  ],
  userController.getUsers,
);

/**
 * @openapi
 * '/api/user/authenticate/save-user/':
 *  post:
 *     tags:
 *     - User
 *      - Authentication
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Invalid params passed
 *      401:
 *        description: Unauthorized, Not authenticated
 *      403:
 *        description: Forbidden
 *      500:
 *        description: Server side error
 */
router.post(
  "/authenticate/save-user",
  [
    check("nom").isString().notEmpty().escape(),
    check("prenom").isString().notEmpty().escape(),
    check("telephone").isString().notEmpty().escape(),
    check("email").isEmail().notEmpty().escape(),
    check("adresse").isString().notEmpty().escape(),
    check("userType").isNumeric().notEmpty().escape(),
    check("password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      )
      .escape(),
  ],
  userController.saveUser,
);

// Swagger
router.patch(
  "/update-user/:uid",
  [
    param("uid").isString().notEmpty().escape(),
    check("nom").isString().notEmpty().escape(),
    check("prenom").isString().notEmpty().escape(),
    check("telephone").isString().notEmpty().escape(),
    check("email").isEmail().notEmpty().escape(),
    check("adresse").isString().notEmpty().escape(),
    check("userType").isNumeric().notEmpty().escape(),
  ],
  userController.updateUser,
);

// Swagger
router.patch(
  "/delete-user/:uid",
  param("uid").isString().notEmpty().escape(),
  userController.deleteUser,
);

export default router;
