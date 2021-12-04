import React from 'react';

interface FormTableProps {
	rows: number;
	cols: number;
}

export default function FormInput({rows, cols}: FormTableProps) {
	
	return (
		<table>
			{(() => {
				for(let i = 0; i < rows; i++) {
					for(let i = 0; i < cols; i++) {
						<tr></tr>
					}
				}
			})}	
		</table>
	);
}