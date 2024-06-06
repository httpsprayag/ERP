import { Router } from 'express';
import itemsController from '../../controllers/itemController';
import authMiddleware from '../../middlewares/authMiddleware';

const itemsRouter = Router();

itemsRouter.use(authMiddleware.authenticate);
itemsRouter.route('/category/create').post(itemsController.createCategory);
itemsRouter.route('/category/list').get(itemsController.listAllCategories);
itemsRouter.route('/group/create').post(itemsController.createGroup);
itemsRouter.route('/group/list').get(itemsController.listAllGroups);
itemsRouter.route('/unit/create').post(itemsController.createUnit);
itemsRouter.route('/unit/list').get(itemsController.listAllUnits);

export default itemsRouter;
