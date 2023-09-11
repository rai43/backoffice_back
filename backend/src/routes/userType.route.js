import express from "express";
import { check, param } from "express-validator";

import checkAuthentication from "../middlewares/check.authentication.js";
import userTypeController from "../controllers/userType.controller.js";
const router = express.Router();

router.use(checkAuthentication);

/**
 * @openapi
 * '/api/user-type/get-user-type/{active}/{inactive}':
 *  get:
 *    tags:
 *    - User Type
 *    summary: Get all user types
 *    parameters:
 *      - name: active
 *        in: path
 *        description: Tells if we have to fetch active user types
 *        required: true
 *        default: true
 *      - name: inactive
 *        in: path
 *        description: Tells if we have to fetch inactive user types
 *        required: true
 *        default: true
 *    responses:
 *      200:
 *        description: Get all user types
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetUserTypeResponse'
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
  "/get-user-type/:active/:inactive",
  [
    param("active").isBoolean().default("true").escape(),
    param("inactive").isBoolean().default("true").escape(),
  ],
  userTypeController.getUserTypes,
);

export default router;
