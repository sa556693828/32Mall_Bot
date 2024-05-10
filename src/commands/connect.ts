import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:about_command');

const connect = () => async (ctx: Context) => {
  debug(`Triggered "connect" command with message`);
  const profileUrl = process.env.TMA_URL as string;

  const keyboardMarkup = {
    inline_keyboard: [[{ text: 'Connect Wallet', url: profileUrl }]],
  };

  await ctx.replyWithMarkdownV2(
    'Thank you for using our Telegram Bot!\n\nYou can connect your wallet by clicking the link below and start enjoying more features and services:',
    {
      reply_markup: keyboardMarkup,
      parse_mode: 'Markdown',
    },
  );
};

export { connect };
