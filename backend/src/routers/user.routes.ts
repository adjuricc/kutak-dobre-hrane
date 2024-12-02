import express from 'express';
import { UserController } from '../controllers/user.controller';

const user_router = express.Router();

user_router.route('/login').post(
    (req, res) => new UserController().login(req, res)
);

user_router.route('/getProfilePicture/:username').get(
    (req, res) => new UserController().getProfilePicture(req, res)
);

user_router.route('/registerGuest').post(
    (req, res) => new UserController().registerGuest(req, res)
);

user_router.route('/activate_user').put(
    (req, res) => new UserController().activate_user(req, res)
);

user_router.route('/reset_password_with_old').put(
    (req, res) => new UserController().reset_password_with_old(req, res)
);

user_router.route('/check_security_answer').post(
    (req, res) => new UserController().check_security_answer(req, res)
);

user_router.route('/change_password').put(
    (req, res) => new UserController().change_password(req, res)
);

user_router.route('/update_user').put(
    (req, res) => new UserController().update_user(req, res)
);

user_router.route('/number_of_registered_guests').get(
    (req, res) => new UserController().number_of_registered_guests(req, res)
);

user_router.route('/get_all_guests').get(
    (req, res) => new UserController().get_all_guests(req, res)
);

user_router.route('/get_all_waiters').get(
    (req, res) => new UserController().get_all_waiters(req, res)
);

user_router.route('/update_accepted').put(
    (req, res) => new UserController().update_accepted(req, res)
);

user_router.route('/get_user').post(
    (req, res) => new UserController().get_user(req, res)
);

export default user_router;