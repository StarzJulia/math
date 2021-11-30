import React, {useContext} from 'react';
import CalculatorResultLink from '../CalculatorResultLink';
import CalculatorFormula from '../CalculatorFormula';
import {Context} from '../../store/store';

export default function g_progression() {
	const {state} = useContext(Context);
	const {values} = state;

	const makeCalculation = () => {
		const a1 = parseFloat(values['a1']);
		const q = parseFloat(values['q']);
		const n = parseFloat(values['n']);

		let an = a1 * Math.pow(q, n - 1);
        var s = (an * q - a1) / (q - 1);

        s = parseFloat(((s * 100) / 100).toFixed(2));
        an = parseFloat(((an * 100) / 100).toFixed(2));
		
		return {n, q, a1, an, 'formularesult': s, 'memberresult': an};
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