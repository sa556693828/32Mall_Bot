import { Context, session, Telegraf } from 'telegraf';
import { help, invite, start, info } from './commands';
import { leftMem, message, newMem } from './event/index';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';
interface SessionData {
  heyCounter: number;
}

interface BotContext extends Context {
  session?: SessionData;
}

const bot = new Telegraf<BotContext>(BOT_TOKEN);

// // Register session middleware
bot.use(session());

// Register logger middleware
bot.use((ctx, next) => {
  const start = Date.now();
  return next().then(() => {
    const ms = Date.now() - start;
    console.log('response time %sms', ms);
  });
});

bot.command('help', help());
bot.command('info', info());
bot.command('invite', invite());
bot.command('start', start());

bot.on('message', message());
//TODO: Check V5 寫法
bot.on('new_chat_members', newMem());
bot.on('left_chat_member', leftMem());

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
