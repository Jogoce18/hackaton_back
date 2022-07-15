import db from "../databases/mongo.js";
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';
import { stripHtml } from "string-strip-html";

export async function signUp(req,res){
    const { name,email,password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    try {
        const user = await db.collection('users').findOne({email:email});
        if(user) return res.status(400).send({message:'Usuário já cadastrado!'})
        await db.collection('users').insertOne({
            name: stripHtml(name).result,
            email: stripHtml(email).result,
            password: passwordHash
        });
       res.status(201).send({message:'Cadastrado com sucesso!'});
    } catch (error) {
        res.status(500).send({message:`${error}`});
    }
}

export async function signIn(req,res){
    const { email,password } = req.body;

    try {
        const user = await db.collection('users').findOne({email:email});
        if(!user) return res.status(404).send({message:'Usuário não cadastrado!'});

        if(user && bcrypt.compareSync(password,user.password)){
            const token = uuid();
            await db.collection('sessions').insertOne({
                userId: user._id,
                token
            });
            res.status(201).send(token)
        }else{
            res.status(401).send({message:'Senha inválida!'})
        }
        
    } catch (error) {
        res.status(500).send({message:`${error}`});
    }
}