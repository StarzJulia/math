import {FormFieldProps} from '../../interfaces/interfaces';
import React from 'react';

export default function FormTableInput({field, value, col, row, fieldChanged}: FormFieldProps) {
	
	return (
		<div className="input-container">
			<input 
				type={field.type || 'text'}
				value={value}
				id={field.id || field.name} 
				name={field.name}
				//className={valid ? '' : 'error'}
				inputMode={field.inputmode || 'decimal'}
				onChange={(e) => fieldChanged(e, field.id || field.name, col, row)}
			/>
		</div>
	);
}