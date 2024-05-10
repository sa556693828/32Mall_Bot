import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:about_command');

const help = () => async (ctx: Context) => {
  debug(`Triggered "help" command with message`);

  const helpMsg = `Let me help you to know how to use me:
*Commands :*
/start - Start the bot
/help - Show this message
/about - Show information about the bot
/dailyTest - Start the daily test
/invite - Invite me to your group
/feedback - Send feedback to the bot developer
/settings - Change the bot settings`;
  await ctx.replyWithMarkdownV2(helpMsg, { parse_mode: 'Markdown' });
};

export { help };
