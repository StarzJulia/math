import React, {useContext} from 'react';
import {Context} from '../../store/store';

interface FormTableProps {
	id: string;
	options: {
		cols: number;
		rows: number;
		squared: boolean;
		values: [];
	};
	change: (id: string) => void;
}

export default function FormTable({id, options, change}: FormTableProps) {
	const {state} = useContext(Context);
	const {vocabulary} = state;

	const createLabel = () => {
		return vocabulary.btns[id]
	}

	const btnClick = () => {
		change(id);
	}

	return (
		<input 
			type="button"
			id={id}
			value={createLabel()}
			className="calc_btn big"
			onClick={btnClick}
		/>
	);
}