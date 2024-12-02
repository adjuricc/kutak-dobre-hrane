import express from 'express';
import { SubjectController } from '../controllers/subject.controller';

const subject_router = express.Router();

subject_router.route('/getAllSubjects').get(
    (req, res) => new SubjectController().getAllSubjects(req, res)
)

export default subject_router;