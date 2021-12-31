import React, {useContext} from 'react';
import CalculatorResultLink from '../../CalculatorResultLink';
import CalculatorFormula from '../../CalculatorFormula';
import {factorialF} from '../../../scripts/calculations';
import {Context} from '../../../store/store';

export default function Factorial() {
	const {state} = useContext(Context);
	const {values} = state;

	const makeCalculation = () => {
		const n = parseFloat(values['number']);
		let list: string[] = [];
		if (n > 0) {
			list.push('= 1');
			if (n >= 3) {
				list.push('2');
				if (n > 3) {
					list.push('...');
				}
			}
			if (n > 1) {
				list.push(`${n}`);
			}
		}

        return {n, l: list.join(' * '), 'formularesult': [factorialF(n)]};
	}

	return (
		<>
			<div className="result-row">
				<div id="result-text">
					<CalculatorFormula formulas={state.formulas[0]} denotation={state.formulas[1]} />
					<CalculatorFormula formulas={state.formulas[0]} denotation={makeCalculation()} />
				</div>
			</div>
			<CalculatorResultLink />
		</>
	)
}