import logger from '@/logger';
import { tableMap, TableName } from './types';
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
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
      .eq('user_id', userId);

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
            user_id: userId,
            username: userName ? userName : undefined,
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
        .eq('user_id', userId)
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
      .from(tableMap.chat_members)
      .select('*')
      .eq('chat_id', chatId)
      .eq('user_id', userId);

    if (userError) {
      throw userError;
    }

    if (existingUser.length > 0) {
      return existingUser;
    } else {
      const { error: newUserError } = await supabase
        .from(tableMap.chat_members)
        .insert([{ chat_id: chatId, user_id: userId }])
        .single();
      console.log(newUserError);
      if (newUserError) {
        throw newUserError;
      }
      const { data: newUserRows, error: newUserRowsError } = await supabase
        .from('chat_members')
        .select('*')
        .eq('user_id', userId)
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
