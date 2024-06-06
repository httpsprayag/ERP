import { Router } from 'express';
import partyController from '../../controllers/partyController';
import authMiddleware from '../../middlewares/authMiddleware';

const partyRouter = Router();

partyRouter.use(authMiddleware.authenticate);
partyRouter.route('/area/add').post(partyController.addAreaTags);
partyRouter.route('/area/list').get(partyController.getAllAreaTags);
partyRouter.route('/collection/add').post(partyController.addCollectionByTag);
partyRouter.route('/collection/list').get(partyController.getAllCollectionByTags);
partyRouter.route('/groupByPurchase/add').post(partyController.addGroupByPurchase);
partyRouter.route('/groupByPurchase/list').get(partyController.getAllGroupByPurchase);
partyRouter.route('/groupBySale/add').post(partyController.addGroupBySale);
partyRouter.route('/groupBySale/list').get(partyController.getAllGroupBySale);
partyRouter.route('/add').post(partyController.addParty);
partyRouter.route('/list').get(partyController.getAllParties);
partyRouter.route('/transaction/:id').get(partyController.getPartyTransaction);

export default partyRouter;
