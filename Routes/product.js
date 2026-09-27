import express from "express";
import { addProduct , getProducts, getProductById, updateProductById,deleteProductById} from "../controllers/product.js";


const router = express.Router();

//=> /api/products/add
router.post("/add", addProduct);    
//=> /api/products/all
router.get("/all", getProducts);   

//=> /api/products/:id
router.get("/:id", getProductById);

//upadate product by id
router.put("/:id",updateProductById);

//delete product by id
router.delete("/:id",deleteProductById);

export default router;