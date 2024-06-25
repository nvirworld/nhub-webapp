import { Row, Col } from 'antd';
import styled from 'styled-components';

const CenterCol = styled(Col)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CenterRow = styled(Row)`
	width: 100%;
	margin-left: auto;
	margin-right: auto;
	justify-content: center;
`;

export { CenterCol, CenterRow };
