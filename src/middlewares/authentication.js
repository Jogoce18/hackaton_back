export default async function authentication(req,res,next){
    const { authorization } = req.headers;
    if(!authorization) return res.status(401).send("Você não enviou o token de autenticação!");
    const token = authorization.replace("Bearer","").trim();
    res.locals.token = token;
    next();
}