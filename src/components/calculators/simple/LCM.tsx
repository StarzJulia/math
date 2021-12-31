import React, {useContext} from 'react';
import CalculatorResultLink from '../../CalculatorResultLink';
import CalculatorFormula from '../../CalculatorFormula';
import {lcmF} from '../../../scripts/calculations';
import {Context} from '../../../store/store';

export default function LCM() {
	const {state} = useContext(Context);
	const {values} = state;

	const makeCalculation = () => {
		const num1 = parseFloat(values['num1']);
		const num2 = parseFloat(values['num2']);
		
		return {
			"a": num1,
			"b": num2,
			"lcmresult": lcmF(Math.min(num1, num2), Math.max(num1, num2))
		};
	}

	return (
		<>
			<div className="result-row">
				<div id="result-text">
					<CalculatorFormula denotation={makeCalculation()} />
				</div>
			</div>
			<CalculatorResultLink />
		</>
	)
}