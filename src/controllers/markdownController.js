import db from "../databases/mongo.js";
import { stripHtml } from "string-strip-html";

export async function editMarkdown(req,res){
    const { token } = res.locals;
    const { id } = req.params;
    const {name,description} = req.body;

    if(!token){
        try {
            await db.collection('allnotes').updateOne({noteId:id},{$set:{
                name:stripHtml(name.trim()).result,
                description:stripHtml(description.trim()).result
            }});
            res.status(201).send({message:'Nota editada!'});
        } catch (error) {
            res.status(500).send({message:`${error}`});
        }
    }else{
        try {
            const session = await db.collection('sessions').findOne({token:token});
            if(!session) return res.status(404).send({message:'Sessão encerrada, logue novamente!'});

            await db.collection('notes').updateOne({userId:session.userId,noteId:id},{$set:{
                name:stripHtml(name.trim()).result,
                description:stripHtml(description.trim()).result
            }});
            res.status(201).send({message:'Nota editada!'});
        } catch (error) {
            res.status(500).send({message:`${error}`});
        }
    }
}

export async function deleteMarkdown(req,res){
    const { token } = res.locals;
    const { id } = req.params;

    if(!token){
        try {
            await db.collection('allnotes').deleteOne({noteId:id});
            res.status(201).send({message:'Nota deletada!'});
        } catch (error) {
            res.status(500).send({message:`${error}`});
        }
    }else{
        try {
            const session = await db.collection('sessions').findOne({token:token});
            if(!session) return res.status(404).send({message:'Sessão encerrada, logue novamente!'});

            await db.collection('notes').deleteOne({userId:session.userId,noteId:id});
            res.status(201).send({message:'Nota deletada!'});
        } catch (error) {
            res.status(500).send({message:`${error}`});
        }
    }
}

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

            const user = await db.collection('users').findOne({userId:session.userId});
            const notes = await db.collection('notes').find({userId:session.userId}).toArray();

            res.status(200).send({notes:notes,name:user.name});
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
                name: stripHtml(name.trim()).result,
                description: stripHtml(description.trim()).result,
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