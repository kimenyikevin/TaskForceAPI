import db from '../db/manager';
import Helper from '../helper/helper';

class manager{
    async create(req, res) {
        const text = `INSERT INTO
        employees(employee_name, national_id, phone_number, email, password, date_of_birth, position)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        returning *`;
        const hashPassword = Helper.hashPassword(req.body.password);
        const values = [
            req.body.employee_name,
            req.body.national_id,
            req.body.phone_number,
            req.body.email,
            hashPassword,
            req.body.date_of_birth,
            'manager'
          ];
        try {
            const user = await db.execute(text, values);
            const { rows } = user;
            if(user.routine == '_bt_check_unique'){
                return res.status(409).send({
                    status: 409,
                    error: `E-mail ${req.body.email} is alrady exist`,
                  });
            }
          const token = Helper.generateToken(rows[0].id)
          return res.status(201).send({
              status: 201,
              token,  
          });
        } catch(error) {
          return res.status(400).send(error);
        }
      }
    async login(req, res){
        const text = 'SELECT * FROM employees WHERE email = $1';
        try {
            const { rows } = await db.execute(text, [req.body.email]);
          if (rows.length < 1) {
            return res.status(404).send({
              status: 404,
               error: `${req.body.email} does not exist in our database` 
              });
          }
          const user = rows[0];
          if (!Helper.comparePassword(user.password, req.body.password)) {
            return res.status(400).send({ 
                status: 400,
                error: 'email and password do not match' 
              });
          }
          const token = Helper.generateToken(user.id, user.email);
          return res.status(200).send({
            status: 200,
            message: 'manager is successfully logged in',
            token:  token,
            });
        } catch (error) {
          return res.status(400).send({
            error: `error accured ${error}`,
          });
        }
    }
}

export default new manager();