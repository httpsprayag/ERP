import { Router } from 'express';
import itemsRouter from './items.route';
import partyRouter from './party.route';
import rolesRouter from './roles.route';
import testRouter from './test.route';
import usersRouter from './users.route';
import warehousesRouter from './warehouses.route';

const router = Router();

const defaultRoutes = [
  {
    path: '/users',
    route: usersRouter,
  },
  {
    path: '/warehouses',
    route: warehousesRouter,
  },
  {
    path: '/roles',
    route: rolesRouter,
  },
  {
    path: '/party',
    route: partyRouter,
  },
  {
    path: '/items',
    route: itemsRouter,
  },
  {
    path: '/test',
    route: testRouter,
  },
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
