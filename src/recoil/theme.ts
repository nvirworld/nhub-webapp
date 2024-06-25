import { atom } from 'recoil';

export interface ThemeState {
	mode: boolean;
}

export const themeState = atom<boolean>({
	key: 'isDark',
	default: true,
});
