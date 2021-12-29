import React from 'react';
import {Field} from '../../interfaces/interfaces';
import FormTableRow from './FormTableRow';

interface FormTableProps {
	field: Field;
	rows: number;
	cols: number;
	options: {
		cols: number;
		rows: number;
		squared: boolean;
		values: [];
	};
    fieldChanged: (value: {}, id: string) => void;
}

export default function FormTable({field, rows, cols, options, fieldChanged}: FormTableProps) {
	
	const changeData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, id: string, col: number, row: number) => {
		options.values[row][col] = e.target.value;

		fieldChanged(options, id);
	}

	return (
		<table className="history_table">
			<tbody>
				{Array(rows).fill(1).map((_el, i) =>
					<FormTableRow 
						key={i} 
						field={field}
						cols={cols} 
						row={i}
						values={options.values[i]}
						fieldChanged={changeData}
					/>
				)}
			</tbody>
		</table>
	);
}