import { Context } from 'telegraf';
import createDebug from 'debug';
import { fetchData, getOrCreateUser, saveMessage } from '@/supabase';

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
  const chatFromId = ctx.chat?.id;

  const messageId = ctx.message?.message_id;

  const msg = ctx.text;
  console.log(msg);

  // console.log(chatFromId);
  // console.log(userId);

  await getOrCreateUser({
    userId: userId as number,
    userName: userName ? userName : '',
    firstName: firstName ? firstName : '',
    lastName: lastName ? lastName : '',
  });

  await saveMessage({
    userId: userId as number,
    chatId: chatFromId as number,
    message: msg as string,
  });

  if (messageId) {
    if (userName) {
      await replyToMessage(
        ctx,
        messageId,
        `Hello, ${userName}!\nThis is the message you send: ${msg}`,
      );
    } else {
      await replyToMessage(
        ctx,
        messageId,
        `Hello, ${firstName} ${lastName}!\nThis is the message you send: ${msg}`,
      );
    }
    // await replyToMessage(ctx, messageId, `Hello, ${userName}!`);
  }
};

export { message };
