import { Context } from 'telegraf';
import createDebug from 'debug';
import { fetchData, getOrCreateUser } from '@/supabase';

const debug = createDebug('bot:greeting_text');

const replyToMessage = (ctx: Context, messageId: number, string: string) =>
  ctx.reply(string, {
    reply_parameters: {
      message_id: messageId,
    },
  });

const message = () => async (ctx: Context) => {
  debug('Triggered "message" event');
  const userFrom = ctx.from;
  const userName = userFrom?.username;
  const firstName = userFrom?.first_name;
  const lastName = userFrom?.last_name;
  const userId = userFrom?.id;
  const messageId = ctx.message?.message_id;

  await getOrCreateUser({
    userId: userId as number,
    userName: userName ? userName : '',
    firstName: firstName ? firstName : '',
    lastName: lastName ? lastName : '',
  });
  // if (messageId) {
  //   await replyToMessage(ctx, messageId, `Hello, ${userName}!`);
  // }
};

export { message };
