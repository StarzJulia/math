import {FormFieldProps} from '../../interfaces/interfaces';
import React from 'react';

export default function FormSelect({field, label, isWrong, fieldChanged}: FormFieldProps) {
	
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
				className={isWrong ? 'error' : ''}
				onChange={e => fieldChanged(e.target.value, field.id || field.name)}
			>

			</select>
		</div>
	);
}