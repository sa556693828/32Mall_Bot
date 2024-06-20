import { Context } from 'telegraf';
import createDebug from 'debug';
import { fetchData } from '../supabase';
import { tableMap } from '@/types';

const debug = createDebug('bot:about_command');

const info = () => async (ctx: Context) => {
  debug(`Triggered "info" command with message`);
  const data = await fetchData(tableMap.test);
  console.log('data', data);
  await ctx.replyWithMarkdownV2(
    /*JSON.stringify(data)*/ 'Hi! This is a bot for 3>2 Book Store.',
    {
      parse_mode: 'Markdown',
    },
  );
};

export { info };
