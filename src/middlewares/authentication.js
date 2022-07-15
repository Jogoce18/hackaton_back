export default async function authentication(req,res,next){
    const { authorization } = req.headers;
    if(!authorization){
        next();
    }else{
        const token = authorization.replace("Bearer","").trim();
        res.locals.token = token;
        next();
    } 
}