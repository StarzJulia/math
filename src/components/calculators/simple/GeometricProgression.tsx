import React, {useContext} from 'react';
import CalculatorResultLink from '../../CalculatorResultLink';
import CalculatorFormula from '../../CalculatorFormula';
import {Context} from '../../../store/store';
import {roundNum} from '../../../scripts/calculations';

export default function GeometricProgression() {
	const {state} = useContext(Context);
	const {values} = state;

	const makeCalculation = () => {
		const a1: number = parseFloat(values['a1']);
		const q: number = parseFloat(values['q']);
		const n: number = parseFloat(values['n']);

		let members: number[] = [];

		for (let i = 1; i <= n; i++) {
			members.push(a1 * Math.pow(q, i - 1));
		}

		let an: number = members[n - 1];
        var s: number = (an * q - a1) / (q - 1);
		
		return {
			n, q, a1, an, 
			l: members.join(', '),
			'formularesult': roundNum(s), 
			'n_memberresult': roundNum(an)
		};
	}

	return (
		<>
			<div className="result-row">
				<div id="result-text">
					<CalculatorFormula />
					<CalculatorFormula denotation={makeCalculation()} />
				</div>
			</div>
			<CalculatorResultLink />
		</>
	)
}