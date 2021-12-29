import React from 'react';
import FormTableRow from './FormTableRow';

interface FormTableProps {
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

export default function FormTableIcon({rows, cols, options, fieldChanged}: FormTableProps) {
	
	const changeData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, id: string, col: number, row: number) => {
		options.values[row][col] = e.target.value;

		fieldChanged(options, id);
	}

	return (
		<div className="calc_form-table-btn">
			
		</div>
	);
}