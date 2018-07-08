// Dynamic queries
export const ADD_MESSAGE = `INSERT INTO messages (\`content\`, \`user_id\`, \`talk_id\`, \`date\`)
                            VALUES ($CONTENT, $USERID, $TALKID, CURDATE());`;
export const GET_ALL_MESSAGES_BY_TALKID = `SELECT m.content, u.name AS user, m.date, m.user_id AS authorId FROM messages AS m 
                                           JOIN users AS u ON u.user_id=m.user_id WHERE \`talk_id\`=$TALKID;`;