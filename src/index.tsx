import React from 'react';
import ReactDOM from 'react-dom';
import CalculatorContainer from './components/CalculatorContainer';
import {Store} from './store/store';

const element = document.getElementById('calc_container');
const calcType = element?.getAttribute('data-type') || 'simple';
const calcName = element?.getAttribute('data-name') || '';
const lang = element?.getAttribute('data-lang') || 'ru';

ReactDOM.render(
    <Store>
        <CalculatorContainer calcName={calcName} calcType={calcType} lang={lang} />
    </Store>,
    element
);