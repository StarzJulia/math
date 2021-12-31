import {FormFieldProps} from '../../interfaces/interfaces';
import React from 'react';

export default function FormInput({field, label, value, isWrong, fieldChanged}: FormFieldProps) {
	
	return (
		<div>
			<label htmlFor={field.id || field.name} >
				<b id={(field.id || field.name) + '-label'}>
					{label}
				</b>
			</label>
			<input 
				type={field.type || 'text'}
				value={value}
				id={field.id || field.name} 
				name={field.name}
				className={isWrong ? 'error' : ''}
				inputMode={field.inputmode || 'decimal'}
				onChange={(e) => fieldChanged(e.target.value, field.id || field.name)}
			/>
		</div>
	);
}