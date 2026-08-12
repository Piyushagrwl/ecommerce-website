const express=require("express");
const router=express.Router();

const protect=require("../middleware/authMiddleware");

const{
addWishlist,
getWishlist,
removeWishlist,
}=require("../controllers/wishlistController");

router.get("/",protect,getWishlist);

router.post("/",protect,addWishlist);

router.delete("/:id",protect,removeWishlist);

module.exports=router; 