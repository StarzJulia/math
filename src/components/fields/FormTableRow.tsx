import React from 'react';
import {onChangeFunc, Field} from '../../interfaces/interfaces';
import FormTableInput from './FormTableInput';

interface FormTableRowProps {
	field: Field;
	row: number;
	cols: number;
	values: [];
    fieldChanged: onChangeFunc;
}

export default function FormTableRow({row, cols, values, fieldChanged}: FormTableRowProps) {
	
	return (
		<tr>
			{Array(cols).fill(1).map((_el, i) => {
				let field = {
					name: 'num'
				};
				return <td key={i}>
					<FormTableInput 
						field={field}
						value={values[i]}
						col={i}
						row={row}
						fieldChanged={fieldChanged} 
					/>
				</td>
			})}
		</tr>
	);
}