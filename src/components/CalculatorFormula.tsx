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

    if (denotation[name + 'result']) {
      pattern.push(`= {${name}result}`);
    }

    return pattern;
  }

  return (
    <>
      {Object.keys(formulas).map((f) => {
        return <div><div className="formula-table" key={f}>
          <CalculatorFormulaRender denotation={denotation} formula={getFormula(f)} i={0} />
        </div></div>
      })}
    </>
  );
}