import React from 'react';
import Icon from '@ant-design/icons';
import { ReactComponent as NhubSVG } from '../../assets/logo.svg';
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { ThemeState } from '../../recoil/theme';
import useResponsiveScr from '../../hooks/useResponsiveScr';

interface NhubIconProps extends Omit<Partial<IconComponentProps>, 'component'> {
	svg: IconComponentProps['component'];
	lg?: number;
	md?: number;
	sm?: number;
	mode?: ThemeState['mode'];
}

const NhubIcon: React.FC<NhubIconProps> = (props) => {
	const { breakpoint } = useResponsiveScr();
	const { svg, lg, md, sm, mode, ...customIconComponentProps } = props;

	const fontSize = breakpoint === 'desktop' ? lg : breakpoint === 'tablet' ? md : sm;

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return <Icon component={svg} style={{ fontSize }} {...customIconComponentProps} />;
};
export const NavLogoIcon: React.FC<Omit<NhubIconProps, 'svg'>> = (props) => (
	<NhubIcon svg={() => <NhubSVG />} {...props} lg={100} md={100} sm={24} />
);

// breakpoints desktop = 1366 / tablet = 768 / mobile = 360
