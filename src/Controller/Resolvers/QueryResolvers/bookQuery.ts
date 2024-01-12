import { authenticated, authorized } from "@Root/Auth/Auth"; 



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
  books: authenticated(authorized('MEMBER', books))
};