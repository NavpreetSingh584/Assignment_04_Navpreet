import express, { Router } from "express";
import * as loanController from "../controllers/loanController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { AuthorizationOptions } from "../models/authorizationOptions";

const router: Router = express.Router();

// "/api/v1/loans" prefixes all below routes
router.get("/", authenticate, loanController.getLoans);

// sequential order authenticate -> isAuthorized -> createLoan
router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),
    loanController.createLoan
);

router.put(
    "/:id",
    authenticate,
    isAuthorized({
        hasRole: ["admin", "manager"],
        allowSameUser: true,
    } as AuthorizationOptions),
    loanController.updateLoan
);

router.delete(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] } as AuthorizationOptions),
    loanController.deleteLoan
);

export default router;