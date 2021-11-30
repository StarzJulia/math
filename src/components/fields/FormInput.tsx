import {FormFieldProps} from '../../interfaces/interfaces';
import React from 'react';

export default function FormInput({field, label, value, fieldChanged}: FormFieldProps) {
	const buildLabel = (values: string[]) => {
		return label.replace(/{}/gi, values.join(", "));
	}

	return (
		<div>
			<label htmlFor={field.id || field.name} ><b id={(field.id || field.name) + '-label'}>
				{buildLabel(field.values || [])}
			</b></label>
			<input 
				type={field.type || 'text'}
				value={value}
				id={field.id || field.name} 
				name={field.name}
				//className={valid ? '' : 'error'}
				inputMode={field.inputmode || 'decimal'}
				onChange={(e) => fieldChanged(e, field.id || field.name)}
			/>
		</div>
	);
}