// import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2';
// import logger from '../logger';

// // Create the connection pool. The pool-specific settings are the defaults
// const pool = mysql.createPool({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   port: Number(process.env.DATABASE_PORT),
//   waitForConnections: true,
//   connectionLimit: 10,
//   maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
//   idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//   queueLimit: 0,
//   enableKeepAlive: true,
//   keepAliveInitialDelay: 0,
// });

// pool.query('SELECT 1', function (err: any) {
//   if (err) {
//     logger.error(err);
//   } else {
//     logger.debug('Database connection established');
//   }
// });

// export async function getOrCreateChatUser(chatId: number, userId: number) {
//   try {
//     const [rows] = await pool
//       .promise()
//       .query<
//         RowDataPacket[]
//       >('SELECT * FROM chat_members WHERE user_id = ? AND chat_id = ? LIMIT 1', [userId, chatId]);
//     if (rows.length > 0) {
//       return rows[0];
//     } else {
//       // 用户不存在，创建用户
//       await pool
//         .promise()
//         .query('INSERT INTO chat_members (chat_id, user_id) VALUES (?, ?)', [
//           chatId,
//           userId,
//         ]);
//       // 查询并返回新创建的用户数据
//       const [newUserRows] = await pool
//         .promise()
//         .query<
//           RowDataPacket[]
//         >('SELECT * FROM chat_members WHERE user_id = ? LIMIT 1', [userId]);
//       return newUserRows[0];
//     }
//   } catch (error) {
//     logger.error('Error creating user:', error);
//   }
// }

// export async function getOrCreateTronAccountIndex(userId: number | string) {
//   try {
//     const [rows] = await pool
//       .promise()
//       .query<
//         RowDataPacket[]
//       >('SELECT * FROM user_tron_account_index WHERE user_id = ? LIMIT 1', [userId]);
//     if (rows.length > 0) {
//       return rows[0];
//     } else {
//       // 用户不存在，创建用户
//       await pool
//         .promise()
//         .query('INSERT INTO user_tron_account_index (user_id) VALUES (?)', [
//           userId,
//         ]);
//       // 查询并返回新创建的用户数据
//       const [newUserRows] = await pool
//         .promise()
//         .query<
//           RowDataPacket[]
//         >('SELECT * FROM user_tron_account_index WHERE user_id = ? LIMIT 1', [userId]);
//       return newUserRows[0];
//     }
//   } catch (error) {
//     logger.error('Error creating user', error);
//   }
// }

// export async function getOrCreateUser(
//   userId: number | string,
//   username: string | null = null,
//   first_name: string | null = null,
//   last_name: string | null = null,
// ) {
//   try {
//     const [rows] = await pool
//       .promise()
//       .query<
//         RowDataPacket[]
//       >('SELECT * FROM users WHERE id = ? LIMIT 1', [userId]);

//     if (rows.length > 0) {
//       // 用户存在，返回用户数据
//       return rows[0];
//     } else {
//       // 用户不存在，创建用户
//       if (!username) {
//         await pool.execute('INSERT INTO users (id) VALUES (?)', [userId]);
//       } else {
//         await pool.execute(
//           'INSERT INTO users (id, username, first_name, last_name) VALUES (?, ?, ?, ?)',
//           [userId, username, first_name, last_name],
//         );
//       }

//       // 查询并返回新创建的用户数据
//       const [newUserRows] = await pool
//         .promise()
//         .query<
//           RowDataPacket[]
//         >('SELECT * FROM users WHERE id = ? LIMIT 1', [userId]);
//       return newUserRows[0];
//     }
//   } catch (error) {
//     logger.error('Error creating user:', error);
//   }
// }

// export async function getUserGroups(userId: number | string) {
//   try {
//     const [rows] = await pool
//       .promise()
//       .query<
//         RowDataPacket[]
//       >('SELECT * FROM chat_members JOIN group_config USING (chat_id) WHERE user_id = ?', [userId]);

//     return rows;
//   } catch (error) {
//     logger.error('Error creating user:', error);
//   }
//   return [];
// }

// export async function updateGroupConfigMainThread(
//   chat_id: number,
//   message_thread_id: number,
// ) {
//   try {
//     pool.execute('UPDATE group_config SET main_thread_id=? WHERE chat_id=?', [
//       message_thread_id,
//       chat_id,
//     ]);
//   } catch (error) {
//     logger.error('Error creating Groups:', error);
//   }
// }

// export async function deleteUsersInGroups(chatId: number) {
//   try {
//     await pool.execute('DELETE FROM chat_members WHERE chat_id = ?', [chatId]);
//   } catch (error) {
//     logger.error('deleteUsersInGroups error:', error);
//   } finally {
//     // 关闭数据库连接
//   }
// }

// export async function updateUserRecaptchaStatus(userId: number) {
//   try {
//     // 查询用户是否存在
//     const [userRows] = await pool
//       .promise()
//       .query<
//         RowDataPacket[]
//       >('SELECT * FROM users WHERE id = ? LIMIT 1', [userId]);
//     if (userRows.length > 0) {
//       // 用户存在，更新 reCAPTCHA 属性为 1
//       if (userRows[0].reCAPTCHA === 1) return true;
//       await pool.execute('UPDATE users SET reCAPTCHA = 1 WHERE id = ?', [
//         userId,
//       ]);
//       return true;
//     } else {
//       logger.error(`User with ID ${userId} not found.`);
//     }
//   } catch (error) {
//     logger.error('Error updating user reCAPTCHA status:', error);
//   }

//   return false;
// }

// export async function getUserVerify(userId: number) {
//   try {
//     const [rows] = await pool
//       .promise()
//       .query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [userId]);

//     if (rows.length > 0) {
//       if (rows[0].reCAPTCHA === 1) return true;
//       else return false;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     logger.error('Error creating user:', error);
//   } finally {
//     // 关闭数据库连接
//   }
// }
// export async function deleteChatUser(chatId: number, userId: number) {
//   try {
//     const [rows] = await pool
//       .promise()
//       .query<
//         RowDataPacket[]
//       >('SELECT * FROM chat_members WHERE chat_id = ? AND user_id = ?', [chatId, userId]);
//     if (rows.length > 0) {
//       // 存在匹配的數據，執行刪除操作
//       const [deleteResult] = await pool
//         .promise()
//         .query<ResultSetHeader>(
//           'DELETE FROM chat_members WHERE chat_id = ? AND user_id = ?',
//           [chatId, userId],
//         );
//       return deleteResult.affectedRows > 0;
//     } else {
//       logger.info('user not found in the group');
//       return false;
//     }
//   } catch (error) {
//     logger.error('Error deleting user:', error);
//     return false;
//   }
// }
// export async function getOrCreateGroupConfig(
//   chat_id: number | string,
//   title?: string,
// ) {
//   try {
//     const [rows] = await pool
//       .promise()
//       .query<
//         RowDataPacket[]
//       >('SELECT * FROM group_config WHERE chat_id = ? LIMIT 1', [chat_id]);
//     if (rows.length > 0) {
//       return rows[0];
//     }

//     await Promise.all([
//       pool
//         .promise()
//         .execute(
//           'INSERT INTO group_config (chat_id, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = ?',
//           [chat_id, title, title],
//         ),
//       pool
//         .promise()
//         .execute('INSERT IGNORE INTO group_tags (chat_id,tag) VALUES (?,?)', [
//           chat_id,
//           '',
//         ]),
//     ]);

//     const [newGroupConfigRows] = await pool
//       .promise()
//       .query<
//         RowDataPacket[]
//       >('SELECT * FROM group_config WHERE chat_id = ? LIMIT 1', [chat_id]);
//     return newGroupConfigRows[0];
//   } catch (error) {
//     logger.error('Error querying group_config', error);
//   }
// }
// export async function getAllGroupConfigs() {
//   try {
//     const [rows] = await pool
//       .promise()
//       .query<
//         RowDataPacket[]
//       >('SELECT chat_id, name, main_thread_id, language_preference FROM group_config WHERE bot_kicked=0');
//     return rows;
//   } catch (error) {
//     logger.error('Error querying group_config:', error);
//   }
// }

// export async function updateGroupConfig(chat_id: number, name: string) {
//   try {
//     await pool
//       .promise()
//       .execute('UPDATE group_config SET name = ? WHERE chat_id = ?', [
//         name,
//         chat_id,
//       ]);
//     return true;
//   } catch (error) {
//     logger.error('Error updating group config:', error);
//     return false;
//   }
// }

// export async function getGroupMsgs(chatId: number) {
//   const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 当前时间减去24小时
//   try {
//     const [result] = await pool
//       .promise()
//       .query('SELECT * FROM msgs WHERE chat_id = ? AND update_time >= ?', [
//         chatId,
//         twentyFourHoursAgo,
//       ]);
//     return result;
//   } catch (error) {
//     logger.error(`Error processing group ${chatId}:`, error);
//   }
// }
// // export async function addNewMessage(entry: MsgModel) {
// //   const { id, chat_id, msg, reply_to, user_id, msg_type } = entry;
// //   try {
// //     await pool.execute(
// //       'INSERT INTO msgs (id, chat_id, msg, reply_to, user_id, msg_type) VALUES (?, ?, ?, ?, ?, ?)',
// //       [id, chat_id, msg, reply_to || null, user_id, msg_type],
// //     );
// //   } catch (error) {
// //     logger.error('Error inserting into database:', error);
// //   }
// // }
// export async function isAdmin(userId: number) {
//   try {
//     const [rows] = await pool
//       .promise()
//       .query<
//         RowDataPacket[]
//       >('SELECT is_admin FROM users WHERE id = ?', [userId]);

//     if (rows.length > 0) {
//       return rows[0].is_admin === 1; // 假設 is_admin 為 1 表示是管理員
//     }

//     return false; // 如果找不到用戶，也視為非管理員
//   } catch (error) {
//     logger.error('Error checking admin status:', error);
//     return false;
//   }
// }

// export async function updateChatUserRole(
//   chatId: number | string,
//   userId: number,
//   role: string,
// ) {
//   try {
//     await pool
//       .promise()
//       .query(
//         'UPDATE chat_members SET role = ? WHERE chat_id = ? AND user_id = ?',
//         [role, chatId, userId],
//       );

//     return true;
//   } catch (error) {
//     logger.error('Error checking admin status:', error);
//     return false;
//   }
// }

// export async function updateUserEthAddress(userId: number, ethAddress: string) {
//   try {
//     await pool
//       .promise()
//       .query('UPDATE users SET eth_address = ? WHERE id = ?', [
//         ethAddress,
//         userId,
//       ]);
//   } catch (error) {
//     logger.error('Error updating chat member eth address:', error);
//   }
// }

// export async function getAllChatMemberLevelExperience(user_id: number) {
//   try {
//     const [rows] = await pool
//       .promise()
//       .query<
//         RowDataPacket[]
//       >('SELECT chat_id, user_id, level, experience, name as group_name FROM chat_members JOIN group_config USING (chat_id) WHERE user_id = ?', [user_id]);
//     if (rows.length) {
//       return rows;
//     } else {
//       return [];
//     }
//   } catch (error) {
//     logger.error('Error getting chat member level experience:', error);
//     return [];
//   }
// }

// export async function getChatMemberLevelExperience(
//   user_id: number,
//   chat_id: number,
// ) {
//   try {
//     const [rows] = await pool
//       .promise()
//       .query<
//         RowDataPacket[]
//       >('SELECT chat_id, user_id, level, experience, name as group_name FROM chat_members JOIN group_config USING (chat_id) WHERE chat_id = ? AND user_id = ? LIMIT 1', [chat_id, user_id]);
//     if (rows.length > 0) {
//       return rows[0];
//     } else {
//       return null;
//     }
//   } catch (error) {
//     logger.error('Error getting chat member level experience:', error);
//     return null;
//   }
// }

// export async function getChatMemberLevelExperienceWithAiUsage(
//   user_id: number,
//   chat_id: number,
// ) {
//   try {
//     const [rows] = await pool
//       .promise()
//       .query<
//         RowDataPacket[]
//       >('SELECT chat_id, COALESCE(SUM(quantity), 0) AS boosts, COALESCE(SUM(ai_command_used_today), 0) AS uses FROM chat_members_ai_usage LEFT JOIN group_boosts gb USING (chat_id) WHERE chat_id = ? AND gb.update_time >= DATE_SUB(NOW(), INTERVAL 30 DAY) GROUP BY chat_id LIMIT 1', [chat_id]);
//     if (rows.length > 0) {
//       return rows[0];
//     } else {
//       return null;
//     }
//   } catch (error) {
//     logger.error('Error getting chat member level experience:', error);
//     return null;
//   }
// }

// export async function incrementChatMemberAiUsage(
//   user_id: number,
//   chat_id: number,
// ) {
//   try {
//     await pool
//       .promise()
//       .query(
//         'INSERT INTO chat_members_ai_usage (chat_id, user_id, ai_command_used_today) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE ai_command_used_today = ai_command_used_today + 1',
//         [chat_id, user_id],
//       );
//   } catch (error) {
//     logger.error('Error incrementing chat member AI usage:', error);
//   }
// }

// export async function resetAiUsage() {
//   try {
//     await pool
//       .promise()
//       .query('UPDATE chat_members_ai_usage SET ai_command_used_today = 0');
//   } catch (error) {
//     logger.error('Error resetting AI usage:', error);
//   }
// }

// export async function insertStripePayment(
//   client_reference_id: string,
//   invoice_id: string,
//   customer_id: string,
//   subscription_id: string,
// ) {
//   try {
//     await pool
//       .promise()
//       .query(
//         'INSERT stripe_payments (client_reference_id, invoice_id, customer_id, subscription_id) VALUES (?, ?, ?, ?)',
//         [client_reference_id, invoice_id, customer_id, subscription_id],
//       );
//   } catch (error) {
//     logger.error('Error resetting AI usage:', error);
//   }
// }

// export async function getStripePaymentBySubscriptionId(
//   subscription_id: string,
// ) {
//   try {
//     const [rows] = await pool
//       .promise()
//       .query<
//         RowDataPacket[]
//       >('SELECT * FROM stripe_payments WHERE subscription_id = ?', [subscription_id]);
//     if (rows.length > 0) {
//       return rows[0];
//     } else {
//       return null;
//     }
//   } catch (error) {
//     logger.error('Error getting stripe payment by subscription ID:', error);
//     return null;
//   }
// }

// /**
//  * Updates the quantity of a stripe payment with retry logic.
//  * @param {string} subscription_id - The ID of the subscription.
//  * @param {number} quantity - The new quantity value.
//  * @returns {Promise<boolean>} - A promise that resolves when the update is successful.
//  */
// export async function updateStripePaymentQuantityWithRetry(
//   subscription_id: string,
//   quantity: number,
// ) {
//   let retryCount = 0;
//   const maxRetries = 5;

//   try {
//     while (retryCount < maxRetries) {
//       const result = await pool
//         .promise()
//         .query<
//           RowDataPacket[]
//         >('SELECT * FROM stripe_payments WHERE subscription_id = ?', [subscription_id]);

//       const rows = result[0];
//       if (rows.length === 0) {
//         // Sleep for 10 seconds before the next retry
//         await new Promise((resolve) => setTimeout(resolve, 10000));

//         retryCount++;
//       } else {
//         await pool
//           .promise()
//           .query(
//             'UPDATE stripe_payments SET quantity=? WHERE subscription_id=?',
//             [quantity, subscription_id],
//           );

//         // Exit the loop if the update is successful
//         return true;
//       }
//     }
//   } catch (error) {
//     logger.error(error);
//   }

//   logger.error('Fail to update stripe payment quantity after 5 retries.');
//   return false;
// }

// export async function updateStripePaymentCancelTime(
//   subscription_id: string,
//   cancel_time: number | null,
// ) {
//   try {
//     await pool
//       .promise()
//       .query(
//         'UPDATE stripe_payments SET cancel_time=FROM_UNIXTIME(?) WHERE subscription_id=?',
//         [cancel_time, subscription_id],
//       );

//     // Exit the loop if the update is successful
//     return true;
//   } catch (error) {
//     logger.error(error);
//   }

//   return false;
// }

// export async function insertGroupBoost(
//   chat_id: number | string,
//   user_id: number,
//   quantity: number | string,
// ) {
//   try {
//     await pool
//       .promise()
//       .query(
//         'INSERT INTO group_boosts (chat_id, user_id, quantity) VALUES (?, ?, ?)',
//         [chat_id, user_id, quantity],
//       );
//   } catch (error) {
//     logger.error('Error inserting group boost:', error);
//   }
// }

// export async function getGroupBoostsCountWithinLast30Days(
//   chat_id: number | string,
// ) {
//   try {
//     const [rows] = await pool
//       .promise()
//       .query<
//         RowDataPacket[]
//       >('SELECT SUM(quantity) as total FROM group_boosts WHERE chat_id = ? AND update_time >= DATE_SUB(NOW(), INTERVAL 30 DAY)', [chat_id]);
//     return rows[0];
//   } catch (error) {
//     logger.error('Error getting group boosts:', error);
//   }
// }

// export async function updateGroupConfigBotKicked(chat_id: number) {
//   try {
//     await pool
//       .promise()
//       .query('UPDATE group_config SET bot_kicked = 1 WHERE chat_id=?', [
//         chat_id,
//       ]);
//   } catch (error) {
//     logger.error('Error updating group config bot kicked:', error);
//   }
// }

// export async function updateGroupConfigRoles(chat_id: string, roles: string) {
//   try {
//     await pool
//       .promise()
//       .query('UPDATE group_config SET roles = ? WHERE chat_id = ?', [
//         roles,
//         chat_id,
//       ]);
//   } catch (error) {
//     logger.error('Error updating group config roles:', error);
//   }
// }

// export async function isAllowedToSupportChat(user_id: number | string) {
//   try {
//     const [rows] = await pool
//       .promise()
//       .query<
//         RowDataPacket[]
//       >('SELECT distinct user_id FROM chat_members INNER JOIN group_boosts using(user_id) WHERE isBanned = 0 AND isMuted = 0 AND user_id=?', [user_id]);
//     if (rows.length > 0) {
//       return true;
//     }
//   } catch (error) {
//     logger.error('Error updating group config roles:', error);
//   }
//   return false;
// }
