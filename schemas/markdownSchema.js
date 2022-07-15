import joi from "joi";

export default async function markdownSchema(req,res,next){
    const markdownSchema = joi.object({
        name: joi.string().trim().required(),
        description: joi.string().trim().required()
    });

    const { error } = markdownSchema.validate(req.body,{abortEarly:false});

    if(error) return res.status(422).send(error.details.map(detail => detail.message));

    next();
}