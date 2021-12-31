import React from 'react';
import {Field} from '../../interfaces/interfaces';
import FormButton from './FormButton';

interface FormTableProps {
	field: Field;
	options: {
		cols: number;
		rows: number;
		squared: boolean;
		values: [];
	};
    fieldChanged: (value: {}, id: string) => void;
}

export default function FormButtonsContainer({field, options, fieldChanged}: FormTableProps) {
	let data = options;

	const addColumn = () => {
		data.cols += 1;
		data.values.map((row: []) => row.push(''));
	}

	const addRow = () => {
		data.rows += 1;
		data.values.push(new Array(data.cols).fill(''));
	}

	const removeColumn = () => {
		data.cols -= 1;
		data.values.map((row: []) => row.pop());
	}

	const removeRow = () => {
		data.rows -= 1;
		data.values.pop();
		
	}
	const changeData = (id: string) => {
		switch(id) {
			case 'removeCol':
				if (options.squared)
					removeRow();
				removeColumn();
				break;
			case 'removeRow':
			case 'remove':
				removeRow();
				if (options.squared)
					removeColumn();
				break;
			case 'addCol':
				if (options.squared)
					addRow();
				addColumn();
				break;
			case 'addRow':
			case 'add':
				addRow();
				if (options.squared)
					addColumn();
				break;
		}

		fieldChanged(data, field.id || field.name);
	}

	return (
		<div className="calc_form-table-btn">
			{field.buttons && field.buttons.map((button, i) => {
				return <FormButton 
					key={i}
					id={button}
					options={options}
					change={changeData}
				/>
			})}
		</div>
	);
}