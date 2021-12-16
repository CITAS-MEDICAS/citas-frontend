const guestAbility = [
  {
    action: 'read',
    subject: 'Guest',
  },
]

export const initialAbility = [
  ...guestAbility,
  {
    action: 'manage',
    subject: 'all',
  },
  // {
  //   action: 'read',
  //   subject: 'Home',
  // },
  // {
  //   action: 'read',
  //   subject: 'Second',
  // },
  // {
  //   action: 'ver',
  //   subject: 'Facebook',
  // },
  // {
  //   action: 'actualizar',
  //   subject: 'Twitter',
  // },
]

export const _ = undefined
