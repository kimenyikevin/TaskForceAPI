import dotenv from 'dotenv';
import helper from './helper'

dotenv.config();

export const testingData = {
    newUser:{
        employee_name: 'habimana',
        national_id: '1199999999999999',
        phone_number: '+250785774843',
        email: 'habimanaemmy@gmail.com',
        password: 'kigalikigali',
        date_of_birth: '1-1-2002',
      },
      notMacthUser:{
        employee_name: 'habimana',
        national_id: '1199999999999999',
        phone_number: '+250785774843',
        email: 'habimanaemmy@gmail.com',
        password: 'kigalihuye',
        date_of_birth: '1-1-2002',
      },
    wrongUser:{
        employee_name: 'habimana',
        national_id: '1199999999999999',
        phone_number: '+250785774843',
        email: '@gmail.com',
        password: 'kigalikigali',
        date_of_birth: '1-1-2002',
      },
     validationUser: {
        employee_name: 'habimana',
        national_id: '11999999999',
        phone_number: '+250785774843',
        email: 'habimanaemmy@gmail.com',
        password: 'kigalikigali',
        date_of_birth: '1-1-2002',
      },
}
export const invaldToken = helper.generateToken(0);
const hashPassword = helper.hashPassword('kigalikigali');
export const text = `INSERT INTO
employees(id, employee_name, national_id, phone_number, email, password, date_of_birth, position)
VALUES($1, $2, $3, $4, $5, $6, $7, $8)
returning *`;
export const testData = [
  1,
  'habimana',
  '1199699999999999',
  '+250784837421',
  'habimanaemmy01@gmail.com',
  hashPassword,
  '1-1-2002',
  'manager'
];
export const developerData = [
    2,
    'habimana',
    '1199999999999888',
    '+250784837000',
    'habimanaemmy02@gmail.com',
    hashPassword,
    '1-1-2002',
    'developer'
  ];
  export const developData = {
    employee_name: 'habimana',
    national_id: '1199999999999777',
    phone_number: '+250784837111',
    email: 'habimanaemmy03@gmail.com',
    date_of_birth: '1-1-2002',
    position: 'developer'
  }
  
  export const managerData ={
    employee_name: 'habimana',
    national_id: '1199999999999222',
    phone_number: '+250784837420',
    email: 'habimanaemmy04@gmail.com',
    date_of_birth: '1-1-2002',
    position: 'manager'
  }

  export const newDevData ={
    employee_name: 'habimana',
    national_id: '1199999911999222',
    phone_number: '+250784837100',
    email: 'habimanaemmy05@gmail.com',
    date_of_birth: '1-1-2002',
    position: 'manager'
  }
  export const searchDataInv = {
    employee_name: '',
    phone_number: '+250784830',
    email: '@gmail.com',
    position: 'manag'
  }
  export const searchData ={
    employee_name: 'habimana',
    phone_number: '+250784837100',
    email: 'habimanaemmy05@gmail.com',
    position: 'manager'
  }