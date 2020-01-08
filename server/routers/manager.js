import express from 'express';
import employee from '../controller/manager'

const router = express.Router();
router.post('/employees', employee.create);

export default router;