import React, {useEffect, useContext, useState} from 'react';
import {Context} from '../store/store';
import {CalcProps} from '../interfaces/interfaces';
import CalculatorResult from './CalculatorResult';
import CalculatorFormula from './CalculatorFormula';
import CalculatorForm from './CalculatorForm';

export default function CalculatorContainer({calcName, calcType, lang} : CalcProps) {
	const {state, dispatch} = useContext(Context);
	const [isVocabularyReady, setVocabularyFlag] = useState(false);
	const [isFormulasReady, setFormulasFlag] = useState(false);
	const [isFieldsReady, setFieldsFlag] = useState(false);
	const [calcFormulas, setCalcFormulas] = useState(false);

	useEffect(() => {
		dispatch({type: 'SET_TYPE', data: calcType});
		dispatch({type: 'SET_NAME', data: calcName});
		dispatch({type: 'SET_LANG', data: lang});
		getVocabulary();
		getFormulas();
		getFields();
	}, []);

	const getVocabulary = () => {
		fetch(`../vocabulary/vocabulary-math-${lang}.json`)
			.then((response) => {
				return response.json();
			})
			.then((result) => {
				const calc = result[calcName];
				let formulas = calc ? (calc.formulas ? calc.formulas[0] : []) : [];

				dispatch({type: 'SET_VOCABULARY', data: result});
				setVocabularyFlag(true);

				for (let f in formulas) {
					if (!formulas[f][1]) {
						setCalcFormulas(true)
					  	break;
					}
				  }
			})
			.catch((error) => {
				dispatch({type: 'SET_ERROR', data: {error: error}});
			});
	}

	const getFormulas = () => {
		fetch('../vocabulary/formulas.json')
			.then((response) => {
				return response.json();
			})
			.then((result) => {
				dispatch({type: 'SET_FORMULAS', data: result});
				setFormulasFlag(true);
			})
			.catch((error) => {
				dispatch({type: 'SET_ERROR', data: {error: error}});
			});
	}

	const getFields = () => {
		fetch(`../calculators/${calcName}.json`)
			.then((response) => {
				return response.json();
			})
			.then((result) => {
				dispatch({type: 'SET_FIELDS', data: {fields: result}});
				setFieldsFlag(true);
			})
			.catch((error) => {
				dispatch({type: 'SET_ERROR', data: {error: error}});
			});
	}

	return (
		<>
			{isFormulasReady && isVocabularyReady && calcFormulas &&
				<div className="formula-result">
					<CalculatorFormula />
				</div>
			}
			{isFieldsReady && isVocabularyReady && isFormulasReady &&
				<CalculatorForm />
			}
			{state.startCalculationFlag && isVocabularyReady && isFormulasReady &&
				<CalculatorResult />
			}
		</>
	)
}