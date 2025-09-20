import express  from "express";
const router=express.Router();
import pool from "./db.js";
router.get('/product-details/:id',async (req,res)=>{
    const { id } = req.params; 
    try{
        const result = await pool.query(
            `SELECT 
               p.*,
               u.username,
               u.phone,
               u.address,
               u.city,
               u.state,
               u.country,
               u.postal_code,
               u.location 
             FROM products p 
             JOIN users u ON p.user_id = u.id
             WHERE p.id = $1`,
             [parseInt(id, 10)]  // id is integer if using Option 1, UUID if Option 2
          );
          
        
       
    if(result.rows.length===0){
        return res.status(404).json({message:"Product not found"});
    }
    res.json(result.rows[0]);
}catch(err){
    console.log("ERROR FETCHING PRODUCTS DETAILS",err);
    res.status(500).json({message:"Failed to fetch the data"});

}

})
export default router;