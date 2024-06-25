import React from 'react';
import styled from 'styled-components';
import useResponsiveScr from '../hooks/useResponsiveScr';
import { Row, Col } from 'antd';

interface NHubLayoutProps {
	children: React.ReactNode;
}

const NHubContentsLayout: React.FC<NHubLayoutProps> = ({ children }) => {
	const { breakpoint } = useResponsiveScr();

	return (
		<Layout.Body>
			<Layout.Contents>
				<Row gutter={[16, 16]}>
					<Col span={24}>
						<h2>제목</h2>
					</Col>
					{breakpoint === 'mobile' ? (
						<>
							<Col span={12}>요소1</Col>
							<Col span={12}>요소2</Col>
						</>
					) : (
						<>
							<Col span={8}>요소1</Col>
							<Col span={8}>요소2</Col>
							<Col span={8}>요소3</Col>
						</>
					)}
				</Row>

				<Row gutter={[16, 16]}>
					<Col span={24}>
						<h2>제목</h2>
					</Col>
					<Col span={24}>리스트1</Col>
					<Col span={24}>리스트2</Col>
					<Col span={24}>리스트3</Col>
				</Row>
			</Layout.Contents>
		</Layout.Body>
	);
};

export default NHubContentsLayout;

const Layout = {
	Body: styled.div`
		display: flex;
		justify-content: center;
	`,
	Contents: styled.div`
		width: 100%;
		max-width: 1364px;
	`,
};
