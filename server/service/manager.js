import db from '../db/manager'

class service{
    findEmployee = async (id) => {
        const findOne = 'SELECT * FROM employees WHERE id=$1';
        try {
          const { rows } = await db.execute(findOne, [id]);
         return rows[0];
        } catch(err) {
          console.log(`error has occurred ${err}`)
        }
      }
      updateEmployee = async (values) =>{
        const updateOne =`UPDATE employees
        SET status=$1
        WHERE id=$2 returning *`;
      try {
         const { rows } = await db.execute(updateOne, values);
       return rows;
      } catch(err) {
        console.log(`error has occurred ${err}`)
      }
      }
}

export default new service();
