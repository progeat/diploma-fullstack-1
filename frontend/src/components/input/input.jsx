import { forwardRef } from 'react';
import styled from 'styled-components';

const InputContainer = forwardRef(({ className, margin, width, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
	height: 40px;
	margin: ${({ margin = '0 0 10px' }) => margin};
	width: ${({ width = '100%' }) => width};
	padding: 10px;
	font-size: 18px;
	border: 1px solid #000;
	color: #f8f8f9;
	background-color: #2b2d32;
`;
