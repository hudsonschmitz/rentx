import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import multer from 'multer';
import uploadConfig from "../config/uploadConfig";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const upload = multer(uploadConfig.upload('./tmp/avatar/'));

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch('/avatar', upload.single("avatar"), updateUserAvatarController.handle);

export { usersRoutes }