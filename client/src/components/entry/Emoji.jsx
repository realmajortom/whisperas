import React from 'react';

export default function Emoji(props) {
	return (
		<div onClick={props.click}>
			<img src={props.src} className={'Emoji ' + (props.selected ? 'Emoji_selected' : '')} alt={props.text} />
		</div>
	)
};