import { Icon, Input } from '../../../../components';
import styled from 'styled-components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placeholder="Поиск по комментариям..."
				margin="0"
				style={{ border: 0 }}
				onChange={onChange}
			/>
			<div className="icon-wrapper">
				<Icon
					inactive="true"
					id="fa-search"
					size="19px"
					style={{ color: '#f8f8f9' }}
				/>
			</div>
		</div>
	);
};

export const Search = styled(SearchContainer)`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 60px;
	border: 1px solid #5e636f;
	border-radius: 22px;
	padding: 1px 1px 1px 10px;
	background-color: #2b2d32;

	& > input {
		padding: 10px 32px 8px 10px;
	}

	& .icon-wrapper {
		flex-shrink: 0;
		position: relative;
		width: 56px;
		height: 56px;
		border-radius: 20px;
		background-color: #4d525f;
	}

	& .icon-wrapper > div {
		position: absolute;
		top: 49%;
		left: 51%;
		transform: translate(-50%, -50%);
	}
`;
