import styled from 'styled-components';

const Error404Container = ({ className }) => {
	return <div className={className}>Ошибка: такой страницы не существует</div>;
};

export const Error404 = styled(Error404Container)`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 30px;
	color: #dd5a5a;
`;
