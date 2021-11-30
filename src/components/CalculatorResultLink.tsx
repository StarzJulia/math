import React, {useContext, useRef} from 'react';
import {Context} from '../store/store';

export default function CalculatorResultLink() {
	const {state} = useContext(Context);
	const textAreaRef = useRef(null);

	const createLink = () => {
        var link = location.origin + location.pathname;
        var i = 0;
        
        for (const a in state.values) {
            link += (i == 0 ? '?' : '&') + a + '=' + state.values[a];
            i++;
        }
		
		return link;
    }

	const copyLink = () => {
		const el = textAreaRef.current;
		let selection = window.getSelection();
		let range = document.createRange();
		range.selectNodeContents(el);
		selection.removeAllRanges();
		selection.addRange(range);
		document.execCommand('copy');
	}

	return (
		<>
			<div className="schedule-link">
				<p id ="result-link_container">
					{state.vocabulary.link}
					<span id="result-link" className="text-to-copy" ref={textAreaRef}>{createLink()}</span>
				</p>
				<div className="result-btn">
					<input 
						id="calc_copy" 
						type="button" 
						value={state.vocabulary.btns.copy_link} 
						className="calc_btn calc_copy" 
						onClick={copyLink}
					/>
				</div>
			</div>
		</>
	);
}