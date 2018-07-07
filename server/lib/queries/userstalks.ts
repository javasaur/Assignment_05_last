// Dynamic queries
export const ADD_USER_TO_TALK = `INSERT INTO talks_users (\`talk_id\`, \`user_id\`) VALUES ($TALKID, $USERID);`;
export const COUNT_USERS_UNDER_TALK = `SELECT COUNT(*) as userCount FROM talks_users WHERE \`talk_id\`=$TALKID;`;
export const GET_USERS_BY_TALK_ID = `SELECT u.user_id, u.name, u.age FROM talks_users 
                                     AS tu JOIN users AS u ON u.user_id=tu.user_id WHERE tu.talk_id=$GROUPID;`;
export const GET_PRIVATE_TALKS_BY_USER_ID = `SELECT  t.talk_id, t.name FROM talks_users AS tu 
                                             JOIN talks AS t ON t.talk_id = tu.talk_id 
                                             WHERE tu.user_id=$USERID AND tu.talk_id LIKE '%\\_%';`;
export const REMOVE_USER_FROM_TALK = `DELETE FROM talks_users
                                      WHERE \`talk_id\`=$TALKID AND \`user_id\`=$USERID;`;