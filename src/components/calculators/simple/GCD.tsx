import React, {useContext} from 'react';
import CalculatorResultLink from '../../CalculatorResultLink';
import CalculatorFormula from '../../CalculatorFormula';
import {Context} from '../../../store/store';
import {gcdF} from '../../../scripts/calculations';

export default function GCD() {
	const {state} = useContext(Context);
	const {values} = state;

	const makeCalculation = () => {
		const num1 = parseFloat(values['num1']);
		const num2 = parseFloat(values['num2']);

		return {
			"a": num1,
			"b": num2,
			"gcdresult": gcdF(Math.min(num1, num2), Math.max(num1, num2))
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