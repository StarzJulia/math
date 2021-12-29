import React, {useContext} from 'react';
import CalculatorResultLink from '../../CalculatorResultLink';
import CalculatorFormula from '../../CalculatorFormula';
import {Context} from '../../../store/store';
import {logF, roundNum} from '../../../scripts/calculations';

export default function Logarithm() {
	const {state} = useContext(Context);
	const {values} = state;

	const makeCalculation = () => {
		const n = parseFloat(values['number']);
		const a = parseFloat(values['base']);

		let b = roundNum(logF(n, a));

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