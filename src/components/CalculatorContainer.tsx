import React, {useEffect, useContext, useState} from 'react';
import {Context} from '../store/store';
import {CalcProps} from '../interfaces/interfaces';
import CalculatorResult from './CalculatorResult';
import CalculatorFormula from './CalculatorFormula';
import CalculatorForm from './CalculatorForm';

export default function CalculatorContainer({calcType, lang} : CalcProps) {
	const {state, dispatch} = useContext(Context);
	const [isVocabularyReady, setVocabularyFlag] = useState(false);
	const [isFieldsReady, setFieldsFlag] = useState(false);
	const [isLabelsReady, setLabelsFlag] = useState(false);
	const [isFormulas, setFormulasFlag] = useState(false);

	useEffect(() => {
		dispatch({type: 'SET_TYPE', data: calcType});
		dispatch({type: 'SET_LANG', data: lang});
		getVocabulary();
		getLabels();
		getFields();
	}, []);

	const getVocabulary = () => {
		fetch(`../vocabulary/vocabulary-math-${lang}.json`)
			.then((response) => {
				return response.json();
			})
			.then((result) => {
				const formulas = result[calcType] ? (result[calcType].formulas ? result[calcType].formulas : {}) : {null};
				dispatch({type: 'SET_VOCABULARY', data: {vocabulary: result, formulas: formulas}});
				setVocabularyFlag(true);
				setFormulasFlag(!!formulas.length);
			})
			.catch((error) => {
				dispatch({type: 'SET_ERROR', data: {error: error}});
			});
	}

	const getLabels = () => {
		fetch(`../vocabulary/labels-${lang}.json`)
			.then((response) => {
				return response.json();
			})
			.then((result) => {
				dispatch({type: 'SET_LABELS', data: {labels: result}});
				setLabelsFlag(true);
			})
			.catch((error) => {
				dispatch({type: 'SET_ERROR', data: {error: error}});
			});
	}

	const getFields = () => {
		fetch('../calculators/' + calcType + '.json')
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
			{isFormulas && isVocabularyReady && 
				<>
					<div id="formula" className="formula-result">
						<CalculatorFormula formulas={state.formulas[0]} denotation={state.formulas[1]} />
					</div>
				</>
			}
			{isLabelsReady && isFieldsReady && isVocabularyReady &&
				<CalculatorForm />
			}
			{state.startCalculationFlag && isVocabularyReady &&
				<CalculatorResult />
			}
		</>
	)
}