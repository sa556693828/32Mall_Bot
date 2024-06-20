import logger from '@/logger';
import { createClient } from '@supabase/supabase-js';
import { tableMap, TableName } from './types';
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

// 查询数据
export async function fetchData(table_name: TableName) {
  try {
    const { data, error } = await supabase.from(table_name).select();
    if (error) {
      logger.error('Error fetching data:', error);
      throw error;
    }
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    logger.error('Error fetching data:', error);
  }
}
// 插入数据
export async function insertData(table_name: TableName, inputData: any) {
  try {
    const { data, error } = await supabase.from(table_name).insert({
      id: '1',
      //created_at: "",
      email: '111',
    });
    if (error) {
      throw error;
    }
    console.log('Inserted data:', data);
  } catch (error) {
    logger.error('Error inserting data:', error);
  }
}
// 插入數據（選擇要存的東西）//尚未測試
// export async function insertData(table_name: TableName, inputData: any) {
//   try {
//     const dataToInsert = {}; // 創建一個空的資料物件

//     // 檢查 inputData 中的每個屬性，如果存在則將其添加到要插入的資料物件中
//     if (inputData.id) {
//       dataToInsert.id = inputData.id;
//     }
//     if (inputData.created_at) {
//       dataToInsert.created_at = inputData.created_at;
//     }
//     if (inputData.email) {
//       dataToInsert.email = inputData.email;
//     }

//     const { data, error } = await supabase.from(table).insert(dataToInsert);
//     if (error) {
//       throw error;
//     }
//     console.log('Inserted data:', data);
//   } catch (error) {
//     logger.error('Error inserting data:', error);
//   }
// }

// 更新数据
export async function updateData(table_name: TableName) {
  try {
    const { data, error } = await supabase
      .from('table_name')
      .update({ column1: 'new_value' })
      .eq('id', 1);
    if (error) {
      throw error;
    }
    console.log('Updated data:', data);
  } catch (error) {
    logger.error('Error updating data:', error);
  }
}
// 删除数据
export async function deleteData(table_name: TableName) {
  try {
    const { data, error } = await supabase
      .from('Try_Members')
      .delete()
      .eq('email', 111);
    if (error) {
      throw error;
    }
    console.log('Deleted data:', data);
  } catch (error) {
    logger.error('Error deleting data:', error);
  }
}
export async function getOrCreateUser({
  userId,
  userName,
  firstName,
  lastName,
}: {
  userId: number;
  userName?: string;
  firstName?: string;
  lastName?: string;
}) {
  try {
    const { data: existingUser, error: userError } = await supabase
      .from(tableMap.users)
      .select('*')
      .eq('user_tgid', userId);

    if (userError) {
      throw userError;
    }
    if (existingUser.length > 0) {
      return existingUser;
    } else {
      const { error: newUserError } = await supabase
        .from(tableMap.users)
        .insert([
          {
            user_tgid: userId,
            user_name: userName ? userName : undefined,
            first_name: firstName ? firstName : undefined,
            last_name: lastName ? lastName : undefined,
          },
        ])
        .single();
      if (newUserError) {
        throw newUserError;
      }
      const { data: newUserRows, error: newUserRowsError } = await supabase
        .from(tableMap.users)
        .select('*')
        .eq('user_tgid', userId)
        .single();

      if (newUserRowsError) {
        throw newUserRowsError;
      }
      return newUserRows;
    }
  } catch (error) {
    logger.error('Error creating user:', error);
  }
}
export async function getOrCreateChatUser(chatId: number, userId: number) {
  try {
    const { data: existingUser, error: userError } = await supabase
      .from(tableMap.users_msgs)
      .select('*')
      .eq('chat_id', chatId)
      .eq('user_tgid', userId);

    if (userError) {
      throw userError;
    }

    if (existingUser.length > 0) {
      return existingUser;
    } else {
      const { error: newUserError } = await supabase
        .from(tableMap.users_msgs)
        .insert([{ chat_id: chatId, user_tgid: userId }])
        .single();
      console.log(newUserError);
      if (newUserError) {
        throw newUserError;
      }
      const { data: newUserRows, error: newUserRowsError } = await supabase
        .from(tableMap.users_msgs)
        .select('*')
        .eq('user_tgid', userId)
        .single();

      if (newUserRowsError) {
        throw newUserRowsError;
      }
      return newUserRows;
    }
  } catch (error) {
    logger.error('Error creating user:', error);
  }
}
export async function inviteFromUser(userId: number, inviteFromId: number) {
  try {
    const { data, error } = await supabase
      .from(tableMap.users)
      .update({ inviteFrom_id: inviteFromId })
      .eq('user_id', userId);
    if (error) {
      logger.error('Error inserting data:', error);
    }
    return data;
  } catch (error) {
    logger.error('Error inserting data:', error);
  }
}
export async function fetchInviter(userId: string) {
  try {
    const { data, error } = await supabase
      .from(tableMap.users)
      .select('inviteFrom_id')
      .eq('user_id', userId);
    if (error) {
      logger.error('Error fetching data:', error);
    }
    return data;
  } catch (error) {
    logger.error('Error fetching data:', error);
  }
}
export async function saveMessage({
  userId,
  chatId,
  message,
}: {
  userId: number;
  chatId: number;
  message?: string;
}) {
  try {
    const { data, error } = await supabase.from(tableMap.users_msgs).insert({
      user_tgid: userId,
      chat_id: chatId,
      message: message,
    });
    if (error) {
      throw error;
    }
    console.log(
      'Inserted data: userId: ' +
        userId +
        ' chatId: ' +
        chatId +
        ' message: ' +
        message,
    );
  } catch (error) {
    logger.error('Error inserting data:', error);
  }
}
