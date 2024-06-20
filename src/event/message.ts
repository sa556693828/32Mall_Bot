import { Context } from 'telegraf';
import createDebug from 'debug';
import { fetchData, getOrCreateUser, saveMessage } from '../supabase';

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
  console.log('msg: ' + msg);
  console.log(typeof msg);

  if (msg?.startsWith('/')) {
    console.log('He just entered an undefined command.');
  } else {
  }

  await getOrCreateUser({
    userId: userId as number,
    userName: userName ? userName : '',
    firstName: firstName ? firstName : '',
    lastName: lastName ? lastName : '',
  });

  if (msg !== undefined && msg.startsWith && !msg.startsWith('/')) {
    await saveMessage({
      userId: userId as number,
      chatId: chatFromId as number,
      message: msg as string,
    });
  }

  if (messageId) {
    if (userName) {
      if (msg === undefined) {
        await replyToMessage(
          ctx,
          messageId,
          `Hello, ${userName}!\n\nThe message type is undefined.`,
        );
      } else {
        await replyToMessage(
          ctx,
          messageId,
          `Hello, ${userName}!\n\nThis is the message you send: ${msg}`,
        );
      }
    } else {
      if (msg === undefined) {
        await replyToMessage(
          ctx,
          messageId,
          `Hello, ${firstName} ${lastName}!\n\nThe message type is undefined.`,
        );
      } else {
        await replyToMessage(
          ctx,
          messageId,
          `Hello, ${firstName} ${lastName}!\n\nThis is the message you send: ${msg}`,
        );
      }
    }
  }
};

export { message };
