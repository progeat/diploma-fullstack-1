import styled from 'styled-components';

const IconContainer = ({ className, id, inactive, ...props }) => (
	<div className={className} {...props}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

export const Icon = styled(IconContainer)`
	font-size: ${({ size = '24px' }) => size};
	margin: ${({ margin = '0' }) => margin};
	color: ${({ color, disabled }) =>
		color ? '#f8f8f9' : disabled ? '#ccc' : '#b1b1b1'};

	&:hover {
		color: #f8f8f9;
		cursor: ${({ inactive }) => (inactive ? 'default' : 'pointer')};
	}
`;
