// Dynamic queries
export const ADD_PUBLIC_TALK = `INSERT INTO talks (\`talk_id\`, \`name\`) 
                                    VALUES((SELECT MAX(CONVERT(t.talk_id, UNSIGNED INTEGER)) + 1 FROM talks AS t 
                                    WHERE \`talk_id\` NOT LIKE '%\\_%'), $TALKNAME)`;
export const ADD_PUBLIC_SUBTALK = `START TRANSACTION;
                                   SET @maxID = (SELECT MAX(CONVERT(t.talk_id, UNSIGNED INTEGER))  FROM talks AS t  
                                   WHERE \`talk_id\` NOT LIKE '%\\_%') + 1;
                                   INSERT INTO talks (\`talk_id\`, \`name\`)  VALUES (@maxID ,  $TALKNAME);
                                   INSERT INTO talks_subtalks(\`talk_id\`, \`subtalk_id\`) VALUES ($PARENTID, @maxID);
                                   COMMIT;`;
export const COUNT_DUPLICATE_NAMES_UNDER_ROOT = `SELECT COUNT(*) AS namesCount FROM talks AS t 
                                             JOIN talks_subtalks AS t_s ON NOT t.talk_id=subtalk_id 
                                             WHERE t.talk_id NOT LIKE '%\\_%' AND t.name=$TALKNAME;`;
export const COUNT_DUPLICATE_NAMES_UNDER_PARENT = `SELECT COUNT(*) AS namesCount FROM talks_subtalks AS t_s 
                                                   JOIN talks AS t ON t.talk_id=t_s.subtalk_id 
                                                     WHERE t.name=$TALKNAME AND t_s.talk_id=$PARENTID;`;
export const COUNT_SUBTALKS = `SELECT COUNT(*) as subtalkCount FROM talks_subtalks WHERE \`talk_id\`=$PARENTID;`;