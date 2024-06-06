import { Router } from 'express';
import userController from '../../controllers/userController';
import authMiddleware from '../../middlewares/authMiddleware';

const usersRouter = Router();

usersRouter.route('/login').post(userController.loginUser);

usersRouter.use(authMiddleware.authenticate);
usersRouter.route('/all').get(userController.fetchAllUsers);
usersRouter.route('/me').get(userController.userProfile);
usersRouter.route('/create').post(userController.createUser);
usersRouter.route('/update/:id').put(userController.updateUser);
usersRouter.route('/delete/:id').delete(userController.deleteUser);
usersRouter.route('/password/change').post(userController.changePassword);

export default usersRouter;
