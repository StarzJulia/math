export interface CalcProps {
    lang: string;
    calcType: string;
    calcName: string;
}

export interface Label {
    [propName: string]: string;
}

export interface Labels {
    labels: Label[];
}

export interface Field {
    name: string;
    id?: string;
    type?: string;
    inputmode?: "search" | "text" | "email" | "tel" | "url" | "decimal" | "none" | "numeric" | undefined;
    classList?: string[];
    values?: string[];
    default?: string | number;
    inputType?: string;
    notRequired?: boolean;
    min?: number;
    max?: number;
    exceptions?: string[] | number[];
    cols?: number;
    rows?: number;
    squared?: boolean;
}

export interface Fields {
    fields: Field[];
}

export interface onChangeFunc {
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, id: string, col?: number, row?: number): void;
}

export interface FormFieldProps {
    field: Field;
	label?: string;
    value?: string | number | undefined;
    fieldChanged: onChangeFunc;
    col?: number;
    row?: number;
}

export interface GlobalStateMatrixValueInterface {
    cols: number;
    rows: number;
    squared: boolean;
    values: [][]
}

export interface GlobalStateInterface {
    lang: string;
    type: string;
    name: string;
    vocabulary: {
        //btn: {[key: string]: string};
        //labels: {[key: string]: string};
        [key: string]: [] | {} | string;
    };
    formulas: [];
    fields: [];
    startCalculationFlag: boolean;
    values: {[key: string]: string | GlobalStateMatrixValueInterface};
}