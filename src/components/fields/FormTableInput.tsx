import {FormFieldProps} from '../../interfaces/interfaces';
import React from 'react';

export default function FormTableInput({field, value, col, row, isWrong, fieldChanged}: FormFieldProps) {
	
	return (
		<div className="input-container">
			<input 
				type={field.type || 'text'}
				value={value}
				id={`${field.name}-${row}-${col}`} 
				name={field.name}
				className={isWrong ? 'error' : ''}
				inputMode={field.inputmode || 'decimal'}
				onChange={(e) => fieldChanged(e, field.name, col, row)}
			/>
		</div>
	);
}