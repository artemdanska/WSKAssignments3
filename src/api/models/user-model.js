import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  console.log('rows', rows);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.length === 0) return false;
  return rows[0];
};

const addUser = async (user) => {
  const {name, email} = user;
  const sql = 'INSERT INTO wsk_users (name, email) VALUES (?, ?)';
  const [result] = await promisePool.execute(sql, [name, email]);
  console.log('rows', result);
  if (result.affectedRows === 0) return false;
  return {user_id: result.insertId};
};

/**
 * Deletes a user and all associated cats from the database.
 * @param {number} userId
 * @returns {Promise<{message: string}>}
 */
const deleteUserAndCats = async (userId) => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?;', [userId]);
    const sql = connection.format('DELETE FROM wsk_users WHERE user_id = ?', [
      userId,
    ]);
    const [result] = await connection.execute(sql);

    if (result.affectedRows === 0) {
      return {message: 'User not deleted'};
    }

    await connection.commit();
    return {message: 'User deleted'};
  } catch (error) {
    await connection.rollback();
    console.error('error', error.message);
    return {message: error.message};
  } finally {
    connection.release();
  }
};

export {listAllUsers, findUserById, addUser, deleteUserAndCats};
