import React, {useContext} from 'react';
import {Context} from '../store/store';
import CalculatorFormulaRender from './CalculatorFormulaRender';

interface FormulaProps {
	denotation?: {[key: string]: string | number},
}

export default function CalculatorFormula({denotation}: FormulaProps) {
  const {state} = useContext(Context);
  const calculator = state.vocabulary[state.name];
  const [calc_formulas, example] = calculator.formulas;
  const isExample = !denotation;
  const variables = isExample ? example : {...example, ...denotation};
  const formulas: {} = {};

  for (let f in calc_formulas) {
    if (isExample && calc_formulas[f][1]) {
      continue;
    }
    formulas[f] = calc_formulas[f][0];
  }

  const getFormula = (name: string): [] => {
    const formula_path = formulas[name].replace(/{|&|}/gi, '').split('.');
    let pattern = state.formulas;

    for (const part of formula_path) {
      pattern = pattern[part];
    }

    return pattern;
  }

  return (
    <>
      {Object.keys(formulas).map((f) => {
        return <div key={f}>
            <div className="formula-table" key={f}>
              <CalculatorFormulaRender denotation={variables} formula={getFormula(f)} i={0} />
              {typeof variables[f + 'result'] !== 'undefined' &&
                <div className="formula-answer">
                  = {variables[f + 'result']}
                </div>
              }
            </div>
        </div>
      })}
    </>
  );
}