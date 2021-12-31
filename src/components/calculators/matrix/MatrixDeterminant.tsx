import React, {useContext, useEffect, useState} from 'react';
import {Context} from '../../../store/store';
import CalculatorResultLink from '../../CalculatorResultLink';
import CalculatorFormula from '../../CalculatorFormula';
import {calcDeterminant} from '../../../scripts/matrices';

export default function MatrixDeterminant() {
	const {state} = useContext(Context);
	const {values, vocabulary, name} = state;
	const [resultFormulas, setResultFormulas] = useState({});

	useEffect(() => {
		setResultFormulas(vocabulary[name].result);
	}, [])

	const makeCalculation = () => {
		const m_field = values['matrix'];
		const d = calcDeterminant(m_field.values);

		return {"detresult": [d]};
	}

	return (
		<>
			<div className="result-row">
				<div id="result-text">
				<CalculatorFormula  
					formulas={resultFormulas} 
					denotation={makeCalculation()} 
				/>
				</div>
			</div>
			<CalculatorResultLink />
		</>
	)
}