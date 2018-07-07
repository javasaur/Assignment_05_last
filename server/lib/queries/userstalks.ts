// Dynamic queries
export const ADD_USER_TO_TALK = `INSERT INTO talks_users (\`talk_id\`, \`user_id\`) VALUES ($TALKID, $USERID);`;
export const ADD_USERS_TO_PRIVATE_TALK = `START TRANSACTION;
                                          INSERT INTO talks_users(\`talk_id\`, \`user_id\`) VALUES ($TALKID, $USER1ID);
                                          INSERT INTO talks_users(\`talk_id\`, \`user_id\`) VALUES ($TALKID, $USER2ID);
                                          COMMIT;`;
export const COUNT_USERS_UNDER_TALK = `SELECT COUNT(*) as userCount FROM talks_users WHERE \`talk_id\`=$TALKID;`;
export const COUNT_USERS_UNDER_TALK_BY_USERID = `SELECT COUNT(*) as userCount FROM talks_users 
                                               WHERE \`talk_id\`=$TALKID AND \`user_id\`=$USERID;`;
export const GET_USERS_BY_TALK_ID = `SELECT u.user_id, u.name, u.age FROM talks_users 
                                     AS tu JOIN users AS u ON u.user_id=tu.user_id WHERE tu.talk_id=$GROUPID;`;
export const GET_PRIVATE_TALKS_BY_USER_ID = `SELECT tu.talk_id, u.name, u2.name FROM talks_users AS tu
                                             JOIN talks_users AS tu2 ON tu.talk_id=tu2.talk_id
                                             JOIN users AS u ON u.user_id=tu.user_id
                                             JOIN users AS u2 ON u2.user_id=tu2.user_id
                                             WHERE tu.user_id=$USERID 
                                             AND tu2.user_id!=$USERID  AND tu.talk_id LIKE '%\\_%';`;
export const REMOVE_USER_FROM_TALK = `DELETE FROM talks_users
                                      WHERE \`talk_id\`=$TALKID AND \`user_id\`=$USERID;`;