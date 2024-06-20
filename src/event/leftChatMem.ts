import { Context } from 'telegraf';
import createDebug from 'debug';
import { fetchData } from '../supabase';
import { tableMap } from '@/types';

const debug = createDebug('bot:greeting_text');

const replyToMessage = (ctx: Context, messageId: number, string: string) =>
  ctx.reply(string, {
    reply_parameters: {
      message_id: messageId,
    },
  });

const leftMem = () => async (ctx: Context) => {
  debug('Triggered "left" text command');
  console.log(ctx.message);
  //fetchData("Try_Member");
  await fetchData(tableMap.users);
  const messageId = ctx.message?.message_id;
  const first_name = `${ctx.message?.from.first_name}`;
  const userName = `${ctx.message?.from.username}`;

  if (messageId) {
    await replyToMessage(ctx, messageId, `Hello , ${userName}!`);
  }
};

export { leftMem };
