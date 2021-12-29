import {GlobalStateInterface} from '../interfaces/interfaces';
export const reducer = (state: GlobalStateInterface, action: {type: string, data: any}) => {
    switch(action.type) {
        case 'SET_LANG': 
            return {
                ...state,
                lang: action.data
            }
        case 'SET_TYPE':
            return {
                ...state,
                type: action.data
            }
        case 'SET_NAME':
            return {
                ...state,
                name: action.data
            }
        case 'SET_ERROR':
            return {
                ...state,
                error: action.data.error
            };
        case 'SET_VOCABULARY':
            return {
                ...state,
                vocabulary: action.data
            };
        case 'SET_FORMULAS':
            return {
                ...state,
                formulas: action.data
            };
        case 'SET_LABELS':
            return {
                ...state,
                labels: action.data.labels,
            };
        case 'SET_FIELDS':
            return {
                ...state,
                fields: action.data.fields,
            };
        case 'SET_CALCULATION_FLAG':
            return {
                ...state,
                startCalculationFlag: action.data
            } 
        case 'SET_FORM_VALUES':
            return {
                ...state,
                values: action.data
            }
        default:
            return state;
    }
};