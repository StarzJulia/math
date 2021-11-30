import React, {useContext} from 'react';
import CalculatorResultLink from '../CalculatorResultLink';
import {lcmF} from '../../scripts/calculations';
import {Context} from '../../store/store';

export default function lcm() {
	const {state} = useContext(Context);
	const {values} = state;

	const makeCalculation = () => {
		const num1 = parseFloat(values['num1']);
		const num2 = parseFloat(values['num2']);

        return lcmF(Math.min(num1, num2), Math.max(num1, num2));
	}

	return (
		<>
			<div className="result-row">
				<div id="result-text">
					{makeCalculation()}
				</div>
			</div>
			<CalculatorResultLink />
		</>
	)
}