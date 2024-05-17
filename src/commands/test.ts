import { Context } from 'telegraf';
import createDebug from 'debug';
import { deleteData, fetchData, insertData, getOrCreateUser } from '@/supabase';
import { TableName } from '@/types';

//import { getOrCreateChatUser } from '@/database';

const debug = createDebug('bot:about_command');

const test = () => async (ctx: Context) => {
  debug(`Triggered "test" command with message`);
  //await fetchData();
  // const data = await fetchData('users' as TableName);

  const uid = ctx.from?.id;

  if (uid === undefined) {
    await ctx.replyWithMarkdownV2('UID is undefined!', {
      parse_mode: 'Markdown',
    });
  } else {
    await ctx.replyWithMarkdownV2(
      `Hello, ${ctx.from?.first_name}, your uid is ${uid}`,
      {
        parse_mode: 'Markdown',
      },
    );
  }

  await ctx.replyWithMarkdownV2(/*JSON.stringify(data)*/ 'Hi! ', {
    parse_mode: 'Markdown',
  });
};

export { test };
