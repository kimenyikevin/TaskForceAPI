import 'idempotent-babel-polyfill';
import db from '../db/manager';
import nodemailer from 'nodemailer';
class employee{
    async create(req, res) {
        const text = `INSERT INTO
          employees(employee_name, national_id, phone_number, email, date_of_birth, position)
          VALUES($1, $2, $3, $4, $5, $6)
          returning *`;
        const values = [
          req.body.employee_name,
          req.body.national_id,
          req.body.phone_number,
          req.body.email,
          req.body.date_of_birth,
          req.body.position
        ];
        try {
          const {rows}  = await db.execute(text, values);
          const data = rows[0];
          let transport = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
               user: 'b0d2959ec50ca7',
               pass: 'a769891334d4d1'
            }
        });
        const message = {
            from: 'manager@taskforce.rw',
            to: data.email,
            subject: 'Update to your registration process',
            html: '<h1>Task Force Challenge</h1><p>you have been registed in our system!</p>'
        };
        transport.sendMail(message, function(err, info) {
            if(err){
                return res.status(400).send({
                    status: 400,
                    error: `error has occurred ${err}`
                });
            }else{
                const { envelope } = info;
                return res.status(201).send({
                    status: 201,
                    message: 'created successfully',
                    data,
                    emailInfo: envelope
                });
            }
        });
        } catch(error) {
          return res.status(400).send({
              status: 400,
              error: `error has occurred ${error}`
          });
        }
      }
      async delete(req, res) {
        const deleteQuery = 'DELETE FROM employees WHERE id=$1 returning *';
        try {
          const { rows } = await db.execute(deleteQuery, [req.params.id]);
          if(!rows[0]) {
            return res.status(404).send({
              status: 404,
              error: 'employee not found'
          });
          }
          return res.status(200).send({ 
            status: 200,
            message: 'employee has been deleted'
           });
        } catch(error) {
          return res.status(400).send({
            status: 400,
            error: `error has occurred ${error}`
        });
        }
      }
      async update(req, res) {
        const findOneQuery = 'SELECT * FROM employees WHERE id=$1';
        const updateOneQuery =`UPDATE employees
          SET employee_name=$1, national_id=$2, phone_number=$3, email=$4, date_of_birth=$5, position=$6
          WHERE id=$7 returning *`;
        try {
          const { rows } = await db.execute(findOneQuery, [req.params.id]);
          const data = rows[0];
          if(!rows[0]) {
            return res.status(404).send({'message': 'reflection not found'});
          }
          const values = [
            req.body.employee_name || data.employee_name,
            req.body.national_id || data.national_id,
            req.body.phone_number || data.phone_number,
            req.body.email || data.email,
            req.body.date_of_birth || data.date_of_birth,
            req.body.position || data.position,
            req.params.id
          ];
          const response = await db.execute(updateOneQuery, values);
          return res.status(200).send({
            status: 200,
            message: 'employee updaed succcessfully',
            data: response.rows
          });
        } catch(err) {
          return res.status(400).send(err);
        }
      }
}

export default new employee();
