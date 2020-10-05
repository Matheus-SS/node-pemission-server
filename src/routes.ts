import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import PermissionController from './controllers/PermissionController';
import RoleController from './controllers/RoleController';
import ProductController from './controllers/ProductController';


import { is } from './middlewares/permission';

const router = Router();

router.post('/sessions', SessionController.create);

router.post('/users', is(['ROLE_ADMIN']), UserController.create);
router.get('/users', is(['ROLE_ADMIN']), UserController.index);
router.delete('/users/:user_id', is(['ROLE_ADMIN']), UserController.delete);

router.post('/permissions', PermissionController.create);
router.post('/roles', RoleController.create);
router.get('/roles/:role_id', is(['ROLE_USER', 'ROLE_ADMIN']), RoleController.show);
router.get('/roles', is(['ROLE_ADMIN']), RoleController.index);


router.post('/products', is(['ROLE_ADMIN']), ProductController.create);
router.get('/products', is(['ROLE_USER', 'ROLE_ADMIN']), ProductController.index);
router.get('/products', is(['ROLE_ADMIN']), ProductController.show);
router.delete('/products/:product_id', is(['ROLE_ADMIN']), ProductController.delete);




export default router;