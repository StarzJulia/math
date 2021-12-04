import React, {useContext} from 'react';
import {Context} from '../store/store';
import CalculatorFormulaRender from './CalculatorFormulaRender';

interface FormulaProps {
  formulas: {[key: string]: string},
	denotation: {[key: string]: string | number},
}

export default function CalculatorFormula({denotation, formulas}: FormulaProps) {
  const {state} = useContext(Context);

  const getFormula = (name: string): [] => {
    const path = formulas[name].replace(/{|&|}/gi, '').split('.');
    let pattern = state.vocabulary;

    for (const part of path) {
      pattern = pattern[part];
    }

    return pattern;
  }

  return (
    <>
      {Object.keys(formulas).map((f) => {
        return <div key={f}>
            <div className="formula-table" key={f}>
              <CalculatorFormulaRender denotation={denotation} formula={getFormula(f)} i={0} />
              {denotation[f + 'result'] &&
                <div className="formula-answer">
                  = {denotation[f + 'result']}
                </div>
              }
            </div>
        </div>
      })}
    </>
  );
}