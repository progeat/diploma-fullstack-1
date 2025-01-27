import styled from 'styled-components';

const ButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	width: ${({ width = '100%' }) => width};
	height: 32px;
	color: ${({ disabled }) => (disabled ? '#080808' : '#fff')};
	border: 1px solid ${({ disabled }) => (disabled ? '#f8f8f9' : '#393d47')};
	border-radius: 8px;
	background-color: ${({ disabled }) => (disabled ? '#f8f8f9' : '#393d47')};

	&:hover {
		cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	}
`;
