import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:about_command');

const invite = () => async (ctx: Context) => {
  debug(`Triggered "invite" command with message`);
  const botName = process.env.BOT_NAME as string;
  const userID = ctx.from?.id;
  const userUsername = ctx.from?.username;
  const userFirstName = ctx.from?.first_name;
  const name = userUsername ? userUsername : userFirstName ? userFirstName : '';

  const inviteLink = `https://t.me/${botName}?start=${userID}`;
  //console.log(botName);
  const message = `Hi ${name}\\!\n\nHere is your invitation link\\!\n\n\`${inviteLink}\`\n\nSend it to your friends and let them join us\\.`;
  // await ctx.replyWithMarkdownV2(message, { parse_mode: 'HTML' });
  await ctx.replyWithMarkdownV2(message);
};

export { invite };
