import {FormFieldProps} from '../../interfaces/interfaces';
import React from 'react';

export default function FormSelect({field, label, fieldChanged}: FormFieldProps) {
	const onFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const v = e.target.value;
		fieldChanged(field.id || field.name, v, true);
	}

	return (
		<div>
			<label htmlFor="side-1"><b id="side-1-label">{label}</b></label>
			<select 
				id={field.id || field.name} 
				name={field.name}
				onChange={e => onFieldChange(e)}
			>

			</select>
		</div>
	);
}