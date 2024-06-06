import { Router } from 'express';
import warehouseController from '../../controllers/warehouseController';
import authMiddleware from '../../middlewares/authMiddleware';

const warehousesRouter = Router();

warehousesRouter.use(authMiddleware.authenticate);

warehousesRouter.route('/write').post(warehouseController.createWarehouse);
warehousesRouter.route('/read').get(warehouseController.getWarehouseList);
warehousesRouter.route('/update/:id').put(warehouseController.updateWarehouse);
warehousesRouter.route('/delete/:id').delete(warehouseController.deleteWarehouse);

export default warehousesRouter;
