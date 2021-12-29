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
	

	console.log(field);

	const changeData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, id: string, col: number, row: number) => {
		options.values[row][col] = e.target.value;

		fieldChanged(options, id);
	}

	return (
		<div className="calc_form-table-btn">
			{field.buttons.map((button, i) => {
				return <FormButton 
					key={i}
					id={button}
					field={field}
					options={options}
					//onClick={}
				/>
			})}
		</div>
	);
}