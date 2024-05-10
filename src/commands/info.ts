import { Context } from 'telegraf';
import createDebug from 'debug';
import { fetchData } from '@/supabase';
import { tableMap } from '@/types';

const debug = createDebug('bot:about_command');

const info = () => async (ctx: Context) => {
  debug(`Triggered "info" command with message`);
  const data = await fetchData(tableMap.artist);
  console.log('data', data);
  await ctx.replyWithMarkdownV2(
    /*JSON.stringify(data)*/ 'Exploring the intersection between philosophy, art, and technology, DEC42 crafts generative artworks that probe new interpretations of our existence in the decentralized age. DEC42 seeks to illuminate philosophical inquiries, inviting viewers into reflective dialogue with both the evolving technological landscape and their sense of self.',
    {
      parse_mode: 'Markdown',
    },
  );
};

export { info };
