// Dynamic queries
export const ADD_MESSAGE = `INSERT INTO messages (\`content\`, \`user_id\`, \`talk_id\`, \`date\`)
                            VALUES ($CONTENT, $USERID, $TALKID, NOW());`;
export const INCREMENT_UNREAD_MESSAGES = `UPDATE unread_messages_counter 
                                          SET \`counter\`=\`counter\`+1 
                                          WHERE \`talk_id\`=$TALKID;`;
export const NULL_UNREAD_MESSAGES = `UPDATE unread_messages_counter SET \`counter\`=0 
                                     WHERE \`talk_id\`=$TALKID AND \`user_id\`=$USERID;`;
export const GET_ALL_MESSAGES_BY_TALKID = `SELECT m.content, u.name AS user, m.date, m.user_id AS authorId 
                                           FROM messages AS m 
                                           JOIN users AS u ON u.user_id=m.user_id WHERE \`talk_id\`=$TALKID
                                           ORDER BY m.date ASC;`;
export const GET_UNREAD_MESSAGES_COUNT = `SELECT counter FROM unread_messages_counter AS umc 
                                          WHERE \`talk_id\`=$TALKID AND \`user_id\`=$USERID;`;
export const REMOVE_ALL_MESSAGES_FROM_TALK = `DELETE FROM messages WHERE \`talk_id\`=$TALKID`;