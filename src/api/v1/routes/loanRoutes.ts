import express, { Router } from "express";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

// Get all loans (any authenticated user)
    router.get("/loans", authenticate, (_req, res) => {
        res.send("All loans (authenticated user)");
    });

// Create loan (admin, manager only)
    router.post(
        "/loans",
        authenticate,
        isAuthorized({ hasRole: ["admin", "manager"] }),
        (_req, res) => {
            res.send("Loan created (admin/manager only)");
        }
);

// Update loan (admin, manager, or same user)
    router.put(
        "/loans/:id",
        authenticate,
        isAuthorized({
            hasRole: ["admin", "manager"],
            allowSameUser: true,
        }),
        (_req, res) => {
            res.send("Loan updated");
        }
);

// Delete loan (admin, manager only)
    router.delete(
        "/loans/:id",
        authenticate,
        isAuthorized({ hasRole: ["admin", "manager"] }),
        (_req, res) => {
            res.send("Loan deleted");
        }
);

export default router;