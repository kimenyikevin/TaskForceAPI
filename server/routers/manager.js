import express from 'express';
import employee from '../controller/manager'

const router = express.Router();
router.post('/employees', employee.create);
router.post('/employees/:id', employee.delete);
router.put('/employees/:id', employee.update);

export default router;