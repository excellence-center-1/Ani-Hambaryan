import React, { useState } from 'react';


export const TextInput = ({ placeholder, value, onChange, id }) => {
	const [errorMessage, setErrorMessage] = useState('');
	const validateText = (text) => {
		const NAME_REGEX = /^[A-Z]+[a-z]/;
		return NAME_REGEX.test(text)
	}

	const handleInputeChange = (e) => {
		const text = e.target.value;
		if (!validateText(text)) {
			setErrorMessage('X');
		} else {
			setErrorMessage('V');
		}
		onChange(e);
	}
	return (
		<div>
			<input
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={handleInputeChange}
				id={id}
			/>
			{errorMessage && <small className="error-message">{errorMessage}</small>}
		</div>
	);
}