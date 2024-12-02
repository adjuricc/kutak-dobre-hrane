import express from 'express';
import Subject from '../models/subject';

export class SubjectController{

    getAllSubjects = async (req: express.Request, res: express.Response) => {
        try{
            const subjects = await Subject.find().exec();
            res.status(200).json({ subjects });
        }
        catch(err){
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}