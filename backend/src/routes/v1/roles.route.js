import { Router } from 'express';
import roleController from '../../controllers/roleController';
import authMiddleware from '../../middlewares/authMiddleware';

const rolesRouter = Router();

rolesRouter.use(authMiddleware.authenticate);
rolesRouter.route('/all').get(roleController.getAllRoles);
rolesRouter.route('/permissions/:id').get(roleController.getPermissionsByRole);
rolesRouter.route('/create').post(roleController.createRole);
rolesRouter.route('/delete/:id').delete(roleController.deleteRole);
rolesRouter.route('/update/:id').put(roleController.updateRole);
rolesRouter.route('/permissions/update').put(roleController.updatePermissions);

export default rolesRouter;
