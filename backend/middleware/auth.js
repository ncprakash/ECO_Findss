import jwt from "jsonwebtoken";
export default function auth(req,res,next){
    const authHeader =req.headers["authorization"];
    const token =authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({error:"Access denied.No token provided"});

    }
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(403).json({error:"invlaid, or expired token"})
        }
        req.user = decoded; // attach decoded user info to req
    next();
    })
}