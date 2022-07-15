import joi from "joi";

export default async function registerSchema(req,res,next){
    const registerSchema = joi.object({
        email: joi.string().trim().email().required(),
        password: joi.string().required(),
        confirmPass: joi.ref('password')
    });

    const { error } = registerSchema.validate(req.body,{abortEarly:false});

    if(error) return res.status(422).send(error.details.map(detail => detail.message));

    next();
}