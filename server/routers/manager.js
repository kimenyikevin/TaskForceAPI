import express from 'express';
import employee from '../controller/manager';
import registration from '../controller/registration';
import validation from '../midleware/validation';
import auth from '../midleware/auth';

const router = express.Router();
router.post('/signup', validation.uservalidation, registration.create);
router.post('/login', registration.login);
router.post('/employees', auth.verifyToken, employee.create);
router.delete('/employee/:id', auth.verifyToken, employee.delete);
router.put('/employees/:id',auth.verifyToken, employee.update);
router.put('/employees/:id/active', auth.verifyToken, employee.active);
router.put('/employees/:id/suspend', auth.verifyToken, employee.suspend);
router.get('/verify', registration.comfirmEmail);
router.post('/employees/search', auth.verifyToken, employee.search);

export default router;