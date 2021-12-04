import React, {useContext} from 'react';
import CalculatorResultLink from '../CalculatorResultLink';
import {Context} from '../../store/store';

export default function matrix_determinant() {
	const {state} = useContext(Context);
	const {values} = state;

	const makeCalculation = () => {
		
	}

	return (
		<>
			<div className="result-row">
				<div id="result-text">
					
				</div>
			</div>
			<CalculatorResultLink />
		</>
	)
}