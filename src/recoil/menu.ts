import { atom } from 'recoil';

export const menuState = atom<Number>({
	key: 'selectedMenu',
	default: 1,
});
