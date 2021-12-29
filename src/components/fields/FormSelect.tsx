import {FormFieldProps} from '../../interfaces/interfaces';
import React from 'react';

export default function FormSelect({field, label, fieldChanged}: FormFieldProps) {
	
	return (
		<div>
			<label htmlFor={field.id || field.name} >
				<b id={(field.id || field.name) + '-label'}>
					{label}
				</b>
			</label>
			<select 
				id={field.id || field.name} 
				name={field.name}
				onChange={e => fieldChanged(e, field.id || field.name)}
			>

			</select>
		</div>
	);
}