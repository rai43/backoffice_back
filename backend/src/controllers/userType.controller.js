import { matchedData, validationResult } from "express-validator";

import userTypeService from "../services/userType.service.js";

const userTypeController = {
  getUserTypes: async (req, res, next) => {
    const valResult = validationResult(req);
    if (!valResult.isEmpty()) {
      res.statusMessage = "Invalid params passed";
      return res.sendStatus(400);
    }
    const requestData = matchedData(req);

    const IS_ACTIVE = requestData.active === "true";
    const IS_INACTIVE = requestData.inactive === "true";

    let userTypes;

    try {
      userTypes = await userTypeService.findUserTypes(IS_ACTIVE, IS_INACTIVE);
    } catch (e) {
      res.statusMessage = "Could not fetch the user types";
      return res.sendStatus(500);
    }

    if (!userTypes) {
      res.statusMessage = "Could not fetch the user types";
      return res.sendStatus(500);
    }

    return res.json({
      message: "Successfully fetch the user types",
      types: userTypes,
    });
  },
};

export default userTypeController;
