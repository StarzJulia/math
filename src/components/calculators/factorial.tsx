import React, {useContext} from 'react';
import CalculatorResultLink from '../CalculatorResultLink';
import CalculatorFormula from '../CalculatorFormula';
import {factorialF} from '../../scripts/calculations';
import {Context} from '../../store/store';

export default function factorial() {
	const {state} = useContext(Context);
	const {values} = state;

	const makeCalculation = () => {
		const n = parseFloat(values['number']);

        return {n, 'formularesult': factorialF(n)};
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