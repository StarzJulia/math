import React, {useContext} from 'react';
import {Context} from '../../store/store';

interface FormTableProps {
	id: string;
}

export default function FormTable({id}: FormTableProps) {
	const {state} = useContext(Context);
	const {vocabulary} = state;

	const createLabel = () => {
		return vocabulary.btns[id]
	}

	return (
		<input 
			type="button"
			id={id}
			value={createLabel()}
			className="calc_btn big"
		/>
	);
}