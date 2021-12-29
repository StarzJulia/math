import React, {useContext, useRef, useState} from 'react';
import {Context} from '../store/store';

export default function CalculatorResultLink() {
	const {state} = useContext(Context);
	const textAreaRef = useRef(null);
	const [linkCopied, setCopyFlag] = useState(false);

	const createLink = () => {
        var link = location.origin + location.pathname;
        var i = 0;
        
        for (const a in state.values) {
			link += (i == 0 ? '?' : '&') + a + '=';
			let values = state.values[a];
			if (values && typeof values == 'object') {
				for(var v in values.values) {
					link += (v != 0 ? '%20' : '') + values.values[v];
				}
			} else {
            	link += values;
			}
            i++;
        }
		
		return link;
    }

	const copyLink = () => {
		const el = textAreaRef.current;
		var text = el.value;
		var listener = function(ev) {
			ev.clipboardData.setData("text/plain", text);
			ev.preventDefault();
		};
		document.addEventListener("copy", listener);
		document.execCommand("copy");
		document.removeEventListener("copy", listener);

		setCopyFlag(true);
	}

	return (
		<>
			<div className="schedule-link">
				<input 
					type="hidden" 
					ref={textAreaRef}
					id="result-link"
					className="text-to-copy"
					value={createLink()} 
				/>
				<div className="result-btn">
					<input 
						id="calc_copy" 
						type="button" 
						value={state.vocabulary.btns.copy_link} 
						className={(linkCopied ? "calc_copied " : "") + "calc_btn calc_copy"}
						onClick={copyLink}
					/>
				</div>
			</div>
		</>
	);
}