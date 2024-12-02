import express from 'express';
import { AdminController } from '../controllers/admin.controller';

const admin_router = express.Router();

admin_router.route('/login').post(
    (req, res) => new AdminController().login(req, res)
);

admin_router.route('/add_requests').post(
    (req, res) => new AdminController().add_requests(req, res)
);


admin_router.route('/get_all_requests').get(
    (req, res) => new AdminController().get_all_requests(req, res)
);

admin_router.route('/remove_request').post(
    (req, res) => new AdminController().remove_request(req, res)
);

export default admin_router;