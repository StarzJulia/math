import React, {useContext, useState, useEffect} from 'react';
import {Field} from '../interfaces/interfaces';
import {Context} from '../store/store';
import FormInput from './fields/FormInput';
import FormSelect from './fields/FormSelect';
import FormTable from './fields/FormTable';
import FormButtonsContainer from './fields/FormButtonsContainer';

export default function CalculatorForm() {
	const {state, dispatch} = useContext(Context);
	const [error, setError] = useState(false);
	const [values, setValues] = useState(() => {
        var search = location.search.replace('?', '').split('&').reduce<string | {}>((defaults: [], item: string) => {
			const [name, val] = item.split('=');

			if (val && val.indexOf('%20') > -1) {
				let rows = val.split('%20');
				let colLength;
				let rowLength = rows.length;
				let defaultValues = [];

				for (var cells of rows) {
					var cellsArr = cells.split(',');
					defaultValues.push(cellsArr);
					colLength = cellsArr.length;
				}

				defaults[name] = {
					rows: rowLength,
					cols: colLength,
					values: defaultValues
				};
			} else {
				defaults[name] = val;
			}

			return defaults;
		}, {});

		return state.fields.reduce<string | {}>((initialData, field: Field) => {
			const id = field.id || field.name;

			if (field.type == 'matrix') {
				let value: {} = search[id] || {
					cols: field.cols,
					rows: field.rows,
					values: Array.apply(0, Array(field.rows)).map(() => Array.apply(0, Array(field.cols)).map(() => ''))
				};
				initialData[id] = {...value, squared: field.squared || false}
			} else {
				initialData[id] = search[id] || field.default || '';
			}
			
			return initialData;
		}, {});
    });

	console.log(state);

	useEffect(() => {
		if(validate()) {
			showResult();
		}
	}, [values]);

	const buildLabel = (name: string, values: string[]) => {
		return state.vocabulary.labels[name].replace(/{}/gi, values.join(", "));
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
			if (field.type == 'matrix' && v.rows && v.cols) {
				for (let i = 0; i < v.rows; i++) {
					for (let j = 0; j < v.cols; j++) {
						isValid = isValid && validateNumber(field, v.values[i][j]);
					}
				}
			} else if (field.notRequired && v === "") {
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

	const changeData = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, id: string) => {
		const newValues = { ...values };
		newValues[id] = e.target.value;

		setValues(newValues);
	}

	const changeTableData = (value: {}, id: string) => {
		const newValues = { ...values };
		newValues[id] = value;

		setValues(newValues);
	}

	return (
		<>
		<form id="calc_form" onSubmit={onSubmit}>
			<div id="calc_form-content">
				{state.fields.map((field: Field, key: number) => {
					switch(field.type) {
						case 'matrix':
							return <>
								<FormTable
									field={field} 
									rows={3}
									cols={3}
									key={key} 
									options={values[field.id || field.name]}
									fieldChanged={changeTableData}
								/>
								<FormButtonsContainer 
									field={field} 
									options={values[field.id || field.name]}
								/>
							</>;
						case 'select':
							return <FormSelect 
										field={field} 
										label={buildLabel(field.name, field.values || [])} 
										key={key}  
										fieldChanged={changeData}
									/>
						default:
							return <FormInput 
										field={field} 
										label={buildLabel(field.name, field.values || [])} 
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