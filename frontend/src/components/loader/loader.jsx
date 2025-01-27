import styled, { keyframes } from 'styled-components';

const LoaderContainer = ({ className }) => {
	return <div className={className}></div>;
};

const rotate = keyframes` 0% {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		100% {
			transform: translate(-50%, -50%) rotate(360deg);
			`;

export const Loader = styled(LoaderContainer)`
	position: absolute;
	top: 50%;
	left: 50%;
	width: 35px;
	height: 35px;
	border: 5px solid #bbb;
	border-left-color: transparent;
	border-radius: 50%;
	animation: ${rotate} 1s infinite;
`;
