const productScheme=require('../model/product_model')

const ProductInsert=async(req,res)=>{
    try{
        console.log(req.body);
        const{pname,price,pdiscription,rating}=req.body;

        const ProductInfo=new productScheme({pname,price,pdiscription,rating});
        const productSaved=await ProductInfo.save();
        res.send(productSaved);
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal some error accured");
    }
}
module.exports=ProductInsert;