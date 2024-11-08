const ROLES_LIST = [
  {
    id: 52456,
    name: 'ADMIN',
  },
  {
    id: 78643,
    name: 'EDITOR',
  },
  {
    id: 30001,
    name: 'USER',
  },
];

const ROLES_OBJECT = ROLES_LIST.reduce((obj, role) => {
  obj[role.name] = role.id;
  return obj;
}, {});


module.exports = { ROLES_LIST, ROLES_OBJECT };
