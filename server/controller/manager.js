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
}

export default new employee();
