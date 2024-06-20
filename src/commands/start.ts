import {
  getOrCreateUser,
  supabase,
  fetchInviter,
  inviteFromUser,
} from '../supabase';
import createDebug from 'debug';
import { getUsernameOrName, getUsernameOrNameLocal } from '../helpers';
import { tableMap } from '../types';

const debug = createDebug('bot:about_command');

const start = () => async (ctx: any) => {
  debug(`Triggered "start" command with message`);
  const userFrom = ctx.from;
  const userName = userFrom.username;
  const firstName = userFrom.first_name;
  const lastName = userFrom.last_name;
  const userId = userFrom.id;
  const inviteFrom = ctx.payload;

  await getOrCreateUser({
    userId: Number(userId),
    userName: userName ? userName : '',
    firstName: firstName ? firstName : '',
    lastName: lastName ? lastName : '',
  });
  const data = await fetchInviter(userId);
  const dataBaseInviterID =
    data && data.length > 0 ? data[0].inviteFrom_id : null;
  if (inviteFrom === '') {
    const message1 = `👋 Hey, ${getUsernameOrName(userFrom)}!\n\nYou were not invited by anyone\n\nbut you can still use this bot!\n`;
    await ctx.replyWithMarkdownV2(message1, {
      parse_mode: 'Markdown',
    });
    return;
  } else if (Number(inviteFrom) === userId) {
    const message2 = `👋 Hey, ${getUsernameOrName(userFrom)}!\n\nThis is your own invitation link!\n\nSend it to your friends.`;
    await ctx.replyWithMarkdownV2(message2, {
      parse_mode: 'Markdown',
    });
    return;
  } else {
    if (dataBaseInviterID === null) {
      const { data: existingUser, error: userError } = await supabase
        .from(tableMap.users)
        .select('*')
        .eq('user_id', Number(inviteFrom));
      if (existingUser?.length === 0) {
        return await ctx.replyWithMarkdownV2(
          `👋 Hey, ${getUsernameOrName(userFrom)}!\n\nThis is not a valid invite link!\n`,
          {
            parse_mode: 'Markdown',
          },
        );
      }
      const inviterInfo = existingUser?.[0];

      await inviteFromUser(userId, Number(inviteFrom));
      await ctx.replyWithMarkdownV2(
        `👋 Hey, ${getUsernameOrName(userFrom)}!\n\nYou have been invited by ${getUsernameOrNameLocal(inviterInfo)}\n`,
        {
          parse_mode: 'Markdown',
        },
      );
      return;
    }
    const data = await getOrCreateUser({ userId: dataBaseInviterID });
    const inviterInfo = data.length > 0 ? data[0] : null;
    await ctx.replyWithMarkdownV2(
      `👋 Hey, ${getUsernameOrName(userFrom)}!\n\nYou have been invited by ${getUsernameOrNameLocal(inviterInfo)}\n`,
      {
        parse_mode: 'Markdown',
      },
    );
  }
};

export { start };
