import { Router } from 'express';
import testController from '../../controllers/testController';

const testRouter = Router();

testRouter.route('/').get(testController.fetchTestData);

export default testRouter;
