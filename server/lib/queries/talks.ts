// Static querues
export const GET_ALL_PUBLIC_TALKS = `SELECT * FROM talks WHERE \`talk_id\` NOT LIKE '%\\_%';`;
export const GET_TALKS_HIERARCHY = `WITH  RECURSIVE talk_path (talk_id, name, path) AS
                                    (
                                        SELECT talk_id, name, talk_id as path FROM talks
                                        WHERE parent IS NULL AND \`talk_id\` NOT LIKE '%\\_%'
                                        UNION ALL
                                        SELECT t.talk_id, t.name, CONCAT(tp.path, ',', t.talk_id)
                                        FROM talk_path AS tp JOIN talks AS t ON tp.talk_id = t.parent
                                    )
                                        SELECT * FROM talk_path`;

// Dynamic queries
export const ADD_PRIVATE_TALK = `INSERT INTO talks (\`talk_id\`, \`name\`) VALUES($TALKID, 'pm');`;
export const ADD_PUBLIC_TALK = `INSERT INTO talks (\`talk_id\`, \`name\`) 
                                    VALUES((SELECT MAX(CONVERT(t.talk_id, UNSIGNED INTEGER)) + 1 FROM talks AS t 
                                    WHERE \`talk_id\` NOT LIKE '%\\_%'), $TALKNAME)`;
export const ADD_PUBLIC_SUBTALK = `START TRANSACTION;
                                   SET @maxID = (SELECT MAX(CONVERT(t.talk_id, UNSIGNED INTEGER))  FROM talks AS t  
                                   WHERE \`talk_id\` NOT LIKE '%\\_%') + 1;
                                   INSERT INTO talks (\`talk_id\`, \`name\`, \`parent\`)  VALUES (@maxID ,  $TALKNAME, $PARENTID);
                                   COMMIT;`;
export const COUNT_DUPLICATE_NAMES_UNDER_ROOT = `SELECT COUNT(*) AS namesCount FROM talks
                                                 WHERE \`parent\` IS NULL AND \`talk_id\` NOT LIKE '%\\_%' 
                                                 AND \`name\`=$TALKNAME;`;
export const COUNT_DUPLICATE_NAMES_UNDER_PARENT = `SELECT COUNT(*) AS namesCount FROM talks 
                                                   WHERE \`parent\`=$PARENTID AND \`name\`=$TALKNAME;`;
export const COUNT_SUBTALKS = `SELECT COUNT(*) AS subtalkCount FROM talks WHERE \`parent\`=$PARENTID;`;
export const GET_TALK_BY_ID = `SELECT * FROM talks WHERE \`talk_id\`=$TALKID;`;