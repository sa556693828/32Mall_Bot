// export type TableName =
//   | 'artist'
//   | 'users'
//   | 'msgs'
//   | 'chat_members'
//   | 'group_config'
//   | 'group_tags'
//   | 'user_in_chat';
// export const tableMap: Record<TableName, TableName> = {
//   artist: 'artist',
//   users: 'users',
//   msgs: 'msgs',
//   chat_members: 'chat_members',
//   group_config: 'group_config',
//   group_tags: 'group_tags',
//   user_in_chat: 'user_in_chat',
// };
export type UserData = {
  user_id: number;
  username: string;
  first_name: string;
  last_name: string;
  evm_address: string;
  google: string;
  twitter: string;
  github: string;
  recaptcha: boolean;
  email: string;
  score: string;
  ton_address: string;
  inviteFrom_id: number;
};

export type TableName =
  | 'cart'
  | 'goods'
  | 'orders'
  | 'order_goods_list'
  | 'seller_orders'
  | 'store'
  | 'test'
  | 'users';

export const tableMap: Record<TableName, TableName> = {
  cart: 'cart',
  goods: 'goods',
  order_goods_list: 'order_goods_list',
  orders: 'orders',
  seller_orders: 'seller_orders',
  store: 'store',
  test: 'test',
  users: 'users',
};
