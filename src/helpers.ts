import logger from './logger';
import { Message, User } from 'telegraf/types';

const validTypes = [
  'animation',
  'audio',
  'contact',
  'document',
  'game',
  'venue',
  'location',
  'photo',
  'poll',
  'sticker',
  'text',
  'video',
  'video_note',
  'voice',
];

export function isSuperUser(user_id: number | string) {
  return process.env.SUPER_USER_ID === user_id.toString();
}

export function checkIsStatusMsg(msg: Message) {
  const msgKeys = Object.keys(msg);
  return !validTypes.some((type) => msgKeys.includes(type.toLowerCase()));
}

export function getMsgTypes(msg: Message) {
  const msgKeys = Object.keys(msg);
  return validTypes.filter((type) => msgKeys.includes(type.toLowerCase()));
}

export function isGroup(chatId: number) {
  return chatId < 0;
}

export function getUsernameOrName({
  id,
  username,
  first_name,
  last_name,
}: User) {
  if (username) {
    return `@${username}`;
  }
  if (first_name && first_name.trim().length > 0) {
    if (last_name && last_name.trim().length > 0) {
      return `[${first_name} ${last_name}](tg://user?id=${id})`;
    }

    return `[${first_name}](tg://user?id=${id})`;
  }

  if (last_name) {
    return `[${last_name}](tg://user?id=${id})`;
  }

  return `[${id}](tg://user?id=${id})`;
}
export function getUsernameOrNameLocal({
  user_id,
  username,
  first_name,
  last_name,
}: any) {
  if (username) {
    return `@${username}`;
  }
  if (first_name && first_name.trim().length > 0) {
    if (last_name && last_name.trim().length > 0) {
      return `[${first_name} ${last_name}](tg://user?id=${user_id})`;
    }

    return `[${first_name}](tg://user?id=${user_id})`;
  }

  if (last_name) {
    return `[${last_name}](tg://user?id=${user_id})`;
  }

  return `[${user_id}](tg://user?id=${user_id})`;
}

export function makeInlineKeyboard(buttons: any[]) {
  return buttons.reduce((acc, cur, idx) => {
    if (idx % 2 === 0) {
      acc.push([cur]);
    } else {
      acc[acc.length - 1].push(cur);
    }
    return acc;
  }, []);
}

export function getGroupLevel(boostCount: number) {
  if (boostCount >= 7) {
    return 3;
  } else if (boostCount >= 4) {
    return 2;
  } else if (boostCount >= 1) {
    return 1;
  } else {
    return 0;
  }
}

export function escapeCharactersForMarkdown(text: string) {
  return text.replace(/[~`>#_.*+-=?!^${}()|[\]\\]/g, '\\$&');
}
