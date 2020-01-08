import jwt from 'jsonwebtoken';

class helper {
  generateToken(id) {
    const token = jwt.sign({
      employeeId: id
    },
      process.env.SECRET, { expiresIn: '7d' }
    );
    return token;
  }
}

export default new helper();