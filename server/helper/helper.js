import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

class helper {
  generateToken(id) {
    const token = jwt.sign({
      employeeId: id
    },
      process.env.SECRET, { expiresIn: '7d' }
    );
    return token;
  }
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  }
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }
}

export default new helper();