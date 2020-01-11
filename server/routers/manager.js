import express from 'express';
import employee from '../controller/manager';
import registration from '../controller/registration';
import validation from '../midleware/validation';
import auth from '../midleware/auth';

const router = express.Router();
router.post('/signup', validation.uservalidation, registration.create);
router.post('/login', registration.login);
router.post('/employees', auth.verifyToken, employee.create);
router.post('/employees/:id', employee.delete);
router.put('/employees/:id', employee.update);
router.put('/employees/:id/active', employee.active);
router.put('/employees/:id/suspend', employee.suspend);

export default router;