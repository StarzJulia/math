import React from 'react';

interface CalculatorFormulaRenderProps {
  i: number,
  formula: string[] | [][],
	denotation: {[key: string]: string | number},
}

export default function CalculatorFormulaRender({i, formula, denotation}: CalculatorFormulaRenderProps) {
    const setFormulaVariables = (el: string) => {
      return el.replace(/{[a-z0-9]{1,}}/gi, (i) => {
          return denotation[i.replace(/{|}/gi, '')]
      });
    }

    return <>
        {formula.map((el, index) => {
            switch (typeof el) {
              case "string":
                return <div 
                        key={index} 
                        dangerouslySetInnerHTML={{ __html: setFormulaVariables(el) }}
                        className={el.indexOf('result') > -1 ? 'formula-answer': ''}
                      ></div>
              default:
                return <div key={index} className={i % 2 == 0 ? 'formula-inner_table' : ''}>
                  <CalculatorFormulaRender i={i + 1} denotation={denotation} formula={el} />
                </div>
            }
        })}
    </>
}