import {create} from 'zustand';

const userAuthStorage = create(set => ({
  user: JSON.parse(localStorage.getItem('user')),
  login: (user) => set({user}),
  logout: () => set({user:null}),
  update: (user) => set({user})
}));
export default userAuthStorage

