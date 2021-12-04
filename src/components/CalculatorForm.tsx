import {Field} from '../interfaces/interfaces';
import React, {useContext, useState, useEffect} from 'react';
import {Context} from '../store/store';
import FormInput from './fields/FormInput';
import FormSelect from './fields/FormSelect';

export default function CalculatorForm() {
	const {state, dispatch} = useContext(Context);
	const [error, setError] = useState(false);
	const [values, setValues] = useState(() => {
        var search = location.search.replace('?', '').split('&').reduce<Record<string, string>>((arr, item: string) => {
			const [name, val] = item.split('=');
			arr[name] = val;
			return arr;
		}, {});

		return state.fields.reduce<Record<string, string>>((obj, field: Field) => {
			const id = field.id || field.name;
			obj[id] = search[id] || field.default || '';

			return obj;
		}, {})
    });

	console.log(state);

	useEffect(() => {
		if(validate()) {
			showResult();
		}
	}, [values]);

	const buildLabel = (label: string, values: string[]) => {
		return label.replace(/{}/gi, values.join(", "));
	}

	const validateNumber = (field: Field, v: string): boolean => {
		const reg = (field.inputmode === "numeric") ? /^\d+$/ : /^-?(\d+\.?\d*|\d+\,?\d*|\.\d+)$/;
		const num = parseFloat(v);
		return reg.test(v) 
			&& (typeof field.min == "undefined" || num >= field.min) 
			&& (typeof field.max == "undefined" || num <= field.max)
			&& (typeof field.exceptions == "undefined" || !field.exceptions.includes(num));
	}

	const validateString = (v: string): boolean => {
		return v !== "";
	}

	const validate = () => {
		const valid = state.fields.reduce((isValid: boolean, field: Field): boolean => {
			const v = values[field.id || field.name];
			if (field.notRequired && v === "") {
				isValid = isValid && true;
			} else if (field.type == 'select' || field.inputType == 'string') {
				isValid = isValid && validateString(v);
			} else {
				isValid = isValid && validateNumber(field, v);
			}
			return isValid;

		}, true);
		
		setError(!valid);
		return valid;
	}

	const showResult = () => {
		dispatch({type: 'SET_CALCULATION_FLAG', data: !error});

		if (error) {
			return;
		}

		dispatch({type: 'SET_FORM_VALUES', data: values});
	}

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
		showResult();
	}

	const changeData = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
		const newValues = { ...values };
		newValues[id] = e.target.value;

		setValues(newValues);
	}

	return (
		<>
		<form id="calc_form" onSubmit={onSubmit}>
			<input type="hidden" id="type" value={state.type} />
			<div id="calc_form-content">
				{state.fields.map((field: Field, key: number) => {
					switch(field.type) {
						case 'matrix':
							return <></>;
						case 'select':
							return <FormSelect 
										field={field} 
										label={buildLabel(state.labels[field.name], field.values || [])} 
										key={key} 
										fieldChanged={changeData}
									/>
						default:
							return <FormInput 
										field={field} 
										label={buildLabel(state.labels[field.name], field.values || [])} 
										key={key} 
										value={values[field.id || field.name]}
										fieldChanged={changeData}
									/>
					}
				})}
			</div>
			<div className="calc_form-btns">
				<input 
					id="calc_count"
					type="submit" 
					value={state.vocabulary.btns.calc} 
					className="calc_btn calc_count"
				/>
			</div>
		</form>
		</>
	);
}