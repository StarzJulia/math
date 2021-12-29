import React, {useContext} from 'react';
import CalculatorResultLink from '../../CalculatorResultLink';
import CalculatorFormula from '../../CalculatorFormula';
import {Context} from '../../../store/store';
import {roundNum} from '../../../scripts/calculations';

export default function ArithmeticProgression() {
	const {state} = useContext(Context);
	const {values} = state;

	const makeCalculation = () => {
		const a1: number = parseFloat(values['a1']);
		const d: number = parseFloat(values['d']);
		const n: number = parseFloat(values['n']);
		let members: number[] = [];

		for (let i = 1; i <= n; i++) {
			members.push(a1 + d * (i - 1));
		}

		let an: number = members[n - 1];
        let s: number = n * (a1 + an) / 2;
		
		return {
			n, d, a1, an, 
			l: members.join(', '),
			'formularesult': roundNum(s), 
			'n_memberresult': roundNum(an)
		};
	}

	return (
		<>
			<div className="result-row">
				<div id="result-text">
					<CalculatorFormula  />
					<CalculatorFormula denotation={makeCalculation()} />
				</div>
			</div>
			<CalculatorResultLink />
		</>
	)
}