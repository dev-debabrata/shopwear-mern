import express from "express";
import {
    createAddress,
    getMyAddresses,
    updateAddress,
    deleteAddress,
} from "../controllers/address.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, createAddress);
router.get("/my-addresses", protectRoute, getMyAddresses);
router.put("/:id", protectRoute, updateAddress);
router.delete("/:id", protectRoute, deleteAddress);

export default router;