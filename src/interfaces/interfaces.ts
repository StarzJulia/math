export interface CalcProps {
    lang: string;
    calcType: string;
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
    exceptions?: string[] | number[]
}

export interface Fields {
    fields: Field[];
}

interface onChangeFunc {
    (e: React.ChangeEvent<HTMLInputElement>, id: string): null;
}

export interface FormFieldProps {
    field: Field;
	key: number;
	label: string;
    value?: string | number | undefined;
    fieldChanged: onChangeFunc;
}

export interface GlobalStateInterface {
    lang: string;
    type: string;
    vocabulary: {[key: string]: any};
    formulas: {[key: string]: any};
    fields: [];
    labels: {[key: string]: string};
    startCalculationFlag: boolean;
    values: {[key: string]: string};
}