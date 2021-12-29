import React, {Suspense, useContext} from 'react';
import {Context} from '../store/store';

export default function CalculatorResult() {
	const {state} = useContext(Context);
	
	const CalcComponent = React.lazy(() =>
		import(`./calculators/${state.type}/${state.name}.tsx`)
	);

	return (
	<>
		<div id="result" className="calc-result calc_formula-result">
			<p className="calc_subheader"><b id="result_header">{state.vocabulary.result}</b></p>
			<Suspense fallback={<div>{state.vocabulary.loading}</div>}>
				<CalcComponent />
			</Suspense>
		</div>
	</>
	)
}