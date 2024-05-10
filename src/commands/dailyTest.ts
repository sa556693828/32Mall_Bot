import { Context, Markup } from 'telegraf';
import createDebug from 'debug';

const debug = createDebug('bot:about_command');

const WEB_APP_URL = 'https://feathers.studio/telegraf/webapp/example';
const testUrl =
  'https://1480-2001-b011-13-b16f-bd41-992a-f5ec-8e2a.ngrok-free.app/';

const dailyTest = () => async (ctx: Context) => {
  debug(`Triggered "dailyTest" command with message`);
  // await ctx.setChatMenuButton({
  //   text: 'Launch',
  //   type: 'web_app',
  //   web_app: { url: testUrl },
  // });
  const message = `*Go To Your Daily Test \\!*
  Click on the button below to launch your daily test\\!`;
  await ctx.replyWithMarkdownV2(
    message,
    Markup.inlineKeyboard([Markup.button.webApp('📖', testUrl)]),
  );
};

export { dailyTest };
