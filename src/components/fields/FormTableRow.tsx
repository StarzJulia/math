import React from 'react';
import {onChangeFunc, Field} from '../../interfaces/interfaces';
import FormTableInput from './FormTableInput';

interface FormTableRowProps {
	field: Field;
	row: number;
	cols: number;
	values: [];
	errors: [];
    fieldChanged: onChangeFunc;
}

export default function FormTableRow({field, row, cols, values, errors, fieldChanged}: FormTableRowProps) {
	const isWrongField = (name: string, i: number, j: number) => {
		for (let e of errors) {
			if (e[0] == name && e[1] == i && e[2] == j)
				return true;
		}
		return false;
	}

	return (
		<tr>
			{Array(cols).fill(1).map((_el, i) => {
				const name = field.id || field.name;
				return <td key={i}>
					<FormTableInput 
						field={{name}}
						value={values[i]}
						col={i}
						row={row}
						isWrong={isWrongField(name, row, i)}
						fieldChanged={fieldChanged} 
					/>
				</td>
			})}
		</tr>
	);
}