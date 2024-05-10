import { Context } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:about_command');

const mint = () => async (ctx: Context) => {
  debug(`Triggered "about" command with message`);
  await ctx.replyWithMarkdownV2('mint', { parse_mode: 'Markdown' });
};

export { mint };
