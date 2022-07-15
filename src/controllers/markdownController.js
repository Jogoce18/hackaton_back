import db from "../databases/mongo.js";
import { stripHtml } from "string-strip-html";

export async function getMarkdown(_,res){
    const { token } = res.locals;

    if(!token){
        try {
            const notes = await db.collection('allnotes').find({}).toArray();
            res.status(201).send(notes)
        } catch (error) {
            res.status(500).send({message:`${error}`});
        }
    }else{
        try {
            const session = await db.collection('sessions').findOne({token:token});
            if(!session) return res.status(404).send({message:'Sessão encerrada, logue novamente!'});

            const notes = await db.collection('notes').find({userId:session.userId}).toArray();

            res.status(200).send(notes);
        } catch (error) {
            res.status(500).send({message:`${error}`});
        }
    }
}

export async function createMarkdown(req,res){
    const { token } = res.locals;
    const { name,description } = req.body;

    if(!token){
        try {
            await db.collection('allnotes').insertOne({
                name: stripHtml(name).result,
                description: stripHtml(description).result,
                noteId: Date.now()
            });
            res.status(201).send({message:'Nota cadastrada'});
        } catch (error) {
            res.status(500).send({message:`${error}`});
        }
    }else{
        try {
            const session = await db.collection('sessions').findOne({token:token});
            if(!session) return res.status(404).send({message:'Sessão encerrada, logue novamente!'});

            await db.collection('notes').insertOne({
                name: stripHtml(name).result,
                description: stripHtml(description).result,
                noteId: Date.now(),
                userId: session.userId
            });
            res.status(201).send({message:'Nota cadastrada'});
        } catch (error) {
            res.status(500).send({message:`${error}`});
        }
    }
}