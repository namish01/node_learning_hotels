const jwt=require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next)=>{
    const authorization=req.header.authorization;
    if(!authorization) return res.status(401).json({error:'Token not found:...'});

    
const token=req.header.authorization.split(' ')[1];

if(!token)return res.status(401).json({error:'unauthorized:...'});

try {
    // VERIFY JWT TOKEN:
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    // ATTACH USER INFO TO THE REQUEST:
    req.user=decode;
    next();
} catch (err) {
    console.log(err);
    res.status(401).json({error:'invalid token'});
}
}

// FUNCTION FOR GENERATING TOKENS:
const generateToken=(userData)=>{
return jwt.sign(userData,process.env.JWT_SECRET);
}

module.exports={jwtAuthMiddleware,generateToken};