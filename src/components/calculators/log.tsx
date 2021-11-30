import React, {useContext} from 'react';
import CalculatorResultLink from '../CalculatorResultLink';
import CalculatorFormula from '../CalculatorFormula';
import {Context} from '../../store/store';

export default function log() {
	const {state} = useContext(Context);
	const {values} = state;

	const makeCalculation = () => {
		const n = parseFloat(values['number']);
		const a = parseFloat(values['base']);

		let b = Math.log(n) / Math.log(a);
        b = parseFloat(((b * 100) / 100).toFixed(2));

        return {a, n, b}
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