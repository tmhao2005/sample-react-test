const friends = [
  {
    id: 1,
    name: 'Hao Tran',
  },
  {
    id: 2,
    name: 'Duong Phan',
  },
];

const statuses = {
  1: true,
  2: false,
};

export const getFriends = () => Promise.resolve(friends);

export const checkOnline = (id: number) => Promise.resolve(statuses[id]);
