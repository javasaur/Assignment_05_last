// Static queries
export const GET_ALL_USERS = `SELECT * FROM users;`;
export const GET_ALL_USERS_OMIT_PASSWORD = `SELECT user_id, name, age FROM users;`;

// Dynamic queries
export const GET_FIRST_USER_BY_PROP = `SELECT * FROM users WHERE \`$PROPNAME\`=$PROPVALUE LIMIT 1;`;
export const GET_FIRST_USER_BY_PROP_OMIT_PASSWORD = `SELECT user_id, name, age FROM users 
                                                     WHERE \`$PROPNAME\`=$PROPVALUE LIMIT 1;`;
export const ADD_USER = `INSERT INTO users (\`name\`, \`password\`, \`age\`)
                         VALUES ($NAME, $PASSWORD, $AGE);`;
export const DELETE_USER_BY_ID = `DELETE FROM users WHERE \`user_id\`=$ID;`;
export const UPDATE_USER_BY_ID = `UPDATE users SET \`name\`=$NAME,
                                  \`age\`=$AGE WHERE \`user_id\`=$ID;`;