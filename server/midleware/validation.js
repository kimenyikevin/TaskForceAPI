import Joi from "@hapi/joi";
class Validation {
  uservalidation = (req, res, next) => {
    const schema = {
      employee_name: Joi.string().required().regex(/^[a-zA-Z]+$/),
      national_id: Joi.string().regex(/^[1](\d{15})$/).required(),
      phone_number:  Joi.string().regex(/^[+](250)?(\d{9})$/).required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(8)
        .max(15)
        .required().alphanum(),
      date_of_birth: Joi.date().max('1-1-2002'),
      position: Joi.string(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
     return res.status(400).send({
        status: 400,
        error: result.error.details[0].message
      });
    } 
      next();
  }
}
export default new Validation();