import React from 'react';
import {Field} from '../../interfaces/interfaces';
import FormTableRow from './FormTableRow';

interface FormTableProps {
	field: Field;
	options: {
		cols: number;
		rows: number;
		squared: boolean;
		values: [];
	};
	errors: [];
    fieldChanged: (value: {}, id: string) => void;
}

export default function FormTable({field, options, errors, fieldChanged}: FormTableProps) {
	
	const changeData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, id: string, col: number, row: number) => {
		options.values[row][col] = e.target.value;
		fieldChanged(options, id);
	}

	return (
		<table className="history_table">
			<tbody>
				{Array(options.rows).fill(1).map((_el, i) =>
					<FormTableRow 
						key={i} 
						field={field}
						cols={options.cols} 
						row={i}
						errors={errors}
						values={options.values[i]}
						fieldChanged={changeData}
					/>
				)}
			</tbody>
		</table>
	);
}