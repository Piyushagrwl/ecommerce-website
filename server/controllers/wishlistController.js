const Wishlist=require("../models/Wishlist");

const addWishlist=async(req,res)=>{
try{

const {productId}=req.body;

let wishlist=await Wishlist.findOne({
user:req.user.id,
});

if(!wishlist){

wishlist=await Wishlist.create({
user:req.user.id,
products:[productId],
});

}else{

if(!wishlist.products.includes(productId)){
wishlist.products.push(productId);
}

await wishlist.save();

}

res.status(200).json({
message:"Added To Wishlist",
wishlist,
});

}catch(error){

res.status(500).json({
message:error.message,
});

}
};

const getWishlist=async(req,res)=>{
try{

const wishlist=await Wishlist.findOne({
user:req.user.id,
}).populate("products");

res.status(200).json(wishlist);

}catch(error){

res.status(500).json({
message:error.message,
});

}
};

const removeWishlist=async(req,res)=>{
try{

const wishlist=await Wishlist.findOne({
user:req.user.id,
});

wishlist.products=wishlist.products.filter(
(id)=>id.toString()!==req.params.id
);

await wishlist.save();

res.status(200).json({
message:"Removed",
wishlist,
});

}catch(error){

res.status(500).json({
message:error.message,
});

}
};

module.exports={
addWishlist,
getWishlist,
removeWishlist,
};