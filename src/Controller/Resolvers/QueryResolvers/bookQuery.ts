import { authenticated, authorized } from "#Auth/Auth"; 



function books() {
  return [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ]
}

export default {
  books: authenticated(authorized('USER', books))
};