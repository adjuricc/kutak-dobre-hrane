import express from 'express';
import { AxiosController } from '../controllers/axios.controller';

const axios_router = express.Router();

axios_router.route('/get_coordinates').post(
    (req, res) => new AxiosController().get_coordinates(req, res)
);

export default axios_router;