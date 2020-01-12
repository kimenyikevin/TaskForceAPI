import jwt from 'jsonwebtoken';
import db from '../db/manager';

const Auth = {
  async verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if(!token) {
      return res.status(400).send({ 
        status: 400,
        error: 'Token is not provided'
       });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM employees WHERE id = $1';
      const  { rows } = await db.execute(text, [decoded.employeeId]);
      if(rows.length < 1) {
        return res.status(400).send({
           status: 400,
           error: 'The token you provided is invalid' 
          });
      }
      if(rows[0].position != 'manager') {
        return res.status(400).send({ 
          status: 400,
          error: 'you are not allowed to perfom this task'
         });
      }
      req.user = rows[0];
      next();
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default Auth;