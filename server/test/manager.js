import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import models from '../db/manager';
import helper from '../helper/helper'
import { testingData, invaldToken, text, testData, searchData, newDevData,searchDataInv, developerData, developData, managerData } from '../helper/mock'


const { expect } = chai;
chai.use(chaiHttp);

const newUser = testingData.newUser;
const validation = testingData.validationUser;
const wrongUser = testingData.wrongUser;
const notMacth = testingData.notMacthUser;

describe('test for database', () => {
  before('Clear data from database', (done) => {
    chai.request(server);
    models.execute('DELETE FROM employees');
    done();
  });
  it('sign up validation', (done) => {
    chai
      .request(server)
      .post('/api/v1/signup')
      .set('accept', 'application/json')
      .send(validation)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.an('String');
        done();
      });
  });
  it('should return User created successfully', (done) => {
    chai
      .request(server)
      .post('/api/v1/signup')
      .set('accept', 'application/json')
      .send(newUser)
      .end((err, res) => { 
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('token');
        done();
      });
  });
  it('should return error if an email is already exist', (done) => {
    chai
      .request(server)
      .post('/api/v1/signup')
      .set('accept', 'application/json')
      .send(newUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(409);
        expect(res.body.error).to.be.an('String');
        done();
      });
  });
  it('should return error if user is not exit', (done) => {
    chai
      .request(server)
      .post('/api/v1/login')
      .set('accept', 'application/json')
      .send(wrongUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(404);
        expect(res.body.error).to.be.equal(`${wrongUser.email} does not exist in our database`);
        done();
      });
  });
  it('should return User is successfully logged in', (done) => {
    chai
      .request(server)
      .post('/api/v1/login')
      .set('accept', 'application/json')
      .send(newUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.be.equal('manager is successfully logged in');
        expect(res.body.token).to.be.an('string');
        done();
      });
  });
  it('should return error if Email and password did not match', (done) => {
    chai
      .request(server)
      .post('/api/v1/login')
      .set('accept', 'application/json')
      .send(notMacth)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.equal('email and password do not match');
        done();
      });
  });
});

describe('Test for verifying Token', () => {
    it('should return error if Token is invalid', (done) => {
      chai
        .request(server)
        .post('/api/v1/employees')
        .set('authorization', invaldToken)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.equal('The token you provided is invalid');
          done();
        });
    });
    it('should return error if Token is invalid', (done) => {
      chai
        .request(server)
        .post('/api/v1/employees')
        .set('authorization', '')
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(400);
          expect(res.body.error).to.be.equal('Token is not provided');
          done();
        });
    });
    it('should return error if Token is invalid', (done) => {
      chai
        .request(server)
        .post('/api/v1/employees')
        .set('authorization', 'undifined')
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(400);
          expect(res.body.name).to.be.equal('JsonWebTokenError');
          expect(res.body.message).to.be.equal('jwt malformed');
          done();
        });
    });
    it('should return error if Token is invalid', (done) => {
        models.execute(text, developerData);
        models.execute(text, testData);
        const realToken = helper.generateToken(2);
        chai
          .request(server)
          .post('/api/v1/employees')
          .set('authorization', realToken)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.status).to.equal(400);
            expect(res.body.error).to.be.equal('you are not allowed to perfom this task');
            done();
          });
      });
  });

  describe('Test for manager to create employees', () => {
    it('should create an employee', (done) => {
       models.execute(text, testData);
      const managerToken = helper.generateToken(1);
      chai
        .request(server)
        .post('/api/v1/employees')
        .set('authorization', managerToken)
        .send(developData)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(201);
          expect(res.body.message).to.be.equal('created successfully');
          expect(res.body).to.have.property('newData');
          done();
        });
    });
    it('should return error when there duplicate data', (done) => {
        models.execute(text, testData);
        const managerToken = helper.generateToken(1);
      chai
        .request(server)
        .post('/api/v1/employees')
        .set('authorization', managerToken)
        .send(developData)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(409);
          expect(res.body.error).to.be.an('String');
          done();
        });
    });
    it('should return one user', (done) => {
        models.execute(text, testData);
        const managerToken = helper.generateToken(1);
      chai
        .request(server)
        .post('/api/v1/employees')
        .set('authorization', managerToken)
        .send(managerData)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(409);
          expect(res.body.error).to.be.equal('you are not allowd to register manager');
          done();
        });
    });
  });



  describe('Test for manager to delete employees', () => {
    it('should return error when employee not found', (done) => {
       models.execute(text, testData);
      const managerToken = helper.generateToken(1);
      chai
        .request(server)
        .delete('/api/v1/employee/0')
        .set('authorization', managerToken)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(404);
          expect(res.body.error).to.be.equal('employee not found');
          done();
        });
    });
  });
  

  describe('Test for manager to update employees', () => {
    it('should return error when employee not found', (done) => {
       models.execute(text, testData);
      const managerToken = helper.generateToken(1);
      chai
        .request(server)
        .put('/api/v1/employees/0')
        .set('authorization', managerToken)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(404);
          expect(res.body.error).to.be.equal('employee not found');
          done();
        });
    });
    it('should return employee has been updated', (done) => {
        models.execute(text, testData);
        const managerToken = helper.generateToken(1);
      chai
        .request(server)
        .put('/api/v1/employees/2')
        .set('authorization', managerToken)
        .send(newDevData)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body.message).to.be.equal('employee updaed succcessfully');
          done();
        });
    });
  });
  describe('Test for manager to activate employees', () => {
    it('should return error when employee not found', (done) => {
        models.execute(text, testData);
       const managerToken = helper.generateToken(1);
       chai
         .request(server)
         .put('/api/v1/employees/k/active')
         .set('authorization', managerToken)
         .end((err, res) => {
           expect(res.body).to.be.an('object');
           expect(res.status).to.equal(400);
           expect(res.body.error).to.be.equal('id must be a number');
           done();
         });
     });
    it('should return error when employee not found', (done) => {
       models.execute(text, testData);
      const managerToken = helper.generateToken(1);
      chai
        .request(server)
        .put('/api/v1/employees/0/active')
        .set('authorization', managerToken)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(404);
          expect(res.body.error).to.be.equal('this employee does not exist');
          done();
        });
    });
    it('should return employee has been activeted', (done) => {
        models.execute(text, testData);
        const managerToken = helper.generateToken(1);
      chai
        .request(server)
        .put('/api/v1/employees/2/active')
        .set('authorization', managerToken)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body.message).to.be.equal('employee has been actived successfully');
          expect(res.body.data).to.be.an('Array');
          done();
        });
    });
    it('should return error when employee not found', (done) => {
        models.execute(text, testData);
       const managerToken = helper.generateToken(1);
       chai
         .request(server)
         .put('/api/v1/employees/2/active')
         .set('authorization', managerToken)
         .end((err, res) => {
           expect(res.body).to.be.an('object');
           expect(res.status).to.equal(409);
           expect(res.body.error).to.be.equal('this employee is active');
           done();
         });
     });
  });

  describe('Test for manager to suspend employees', () => {
    it('should return error when employee not found', (done) => {
        models.execute(text, testData);
       const managerToken = helper.generateToken(1);
       chai
         .request(server)
         .put('/api/v1/employees/k/suspend')
         .set('authorization', managerToken)
         .end((err, res) => {
           expect(res.body).to.be.an('object');
           expect(res.status).to.equal(400);
           expect(res.body.error).to.be.equal('id must be a number');
           done();
         });
     });
    it('should return error when employee not found', (done) => {
       models.execute(text, testData);
      const managerToken = helper.generateToken(1);
      chai
        .request(server)
        .put('/api/v1/employees/0/suspend')
        .set('authorization', managerToken)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(404);
          expect(res.body.error).to.be.equal('this employee does not exist');
          done();
        });
    });
    it('should return employee has been activeted', (done) => {
        models.execute(text, testData);
        const managerToken = helper.generateToken(1);
      chai
        .request(server)
        .put('/api/v1/employees/2/suspend')
        .set('authorization', managerToken)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body.message).to.be.equal('employee has been suspended successfully');
          expect(res.body.data).to.be.an('Array');
          done();
        });
    });
    it('should return error when employee not found', (done) => {
        models.execute(text, testData);
       const managerToken = helper.generateToken(1);
       chai
         .request(server)
         .put('/api/v1/employees/2/suspend')
         .set('authorization', managerToken)
         .end((err, res) => {
           expect(res.body).to.be.an('object');
           expect(res.status).to.equal(409);
           expect(res.body.error).to.be.equal('this employee is suspended');
           done();
         });
     });
  });

  describe('Test for manager to search employees', () => {
    it('should return error when employee not found', (done) => {
       models.execute(text, testData);
      const managerToken = helper.generateToken(1);
      chai
        .request(server)
        .post('/api/v1/employees/search')
        .set('authorization', managerToken)
        .send(searchDataInv)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(404);
          expect(res.body.error).to.be.equal('employee not found');
          done();
        });
    });
    it('should return employee has been activeted', (done) => {
        models.execute(text, testData);
        const managerToken = helper.generateToken(1);
      chai
      .request(server)
      .post('/api/v1/employees/search')
      .set('authorization', managerToken)
      .send(searchData)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body.data).to.be.an('Array');
          done();
        });
    });
    it('should employees has been updated', (done) => {
        models.execute(text, testData);
        const managerToken = helper.generateToken(1);
      chai
        .request(server)
        .delete('/api/v1/employee/2')
        .set('authorization', managerToken)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.equal(200);
          expect(res.body.message).to.be.equal('employee has been deleted');
          done();
        });
    });
  });