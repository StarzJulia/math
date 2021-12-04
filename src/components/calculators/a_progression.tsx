import React, {useContext} from 'react';
import CalculatorResultLink from '../CalculatorResultLink';
import CalculatorFormula from '../CalculatorFormula';
import {Context} from '../../store/store';
import {roundNum} from '../../scripts/calculations';

export default function a_progression() {
	const {state} = useContext(Context);
	const {values} = state;

	const makeCalculation = () => {
		const a1 = parseFloat(values['a1']);
		const d = parseFloat(values['d']);
		const n = parseFloat(values['n']);

		let an = a1 + d * (n - 1);
        let s = n * (a1 + an) / 2;
		
		return {n, d, a1, an, 'formularesult': roundNum(s), 'memberresult': roundNum(an)};
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