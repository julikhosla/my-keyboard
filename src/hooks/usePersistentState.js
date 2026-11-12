import { useEffect, useState } from "react";

const read = (key, fallback) => {
	try {
		const raw = window.localStorage.getItem(key);
		if (raw !== null) return JSON.parse(raw);
	} catch {}
	return typeof fallback === "function" ? fallback() : fallback;
};

const usePersistentState = (key, initial) => {
	const [value, setValue] = useState(() => read(key, initial));

	useEffect(() => {
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch {}
	}, [key, value]);

	return [value, setValue];
};

export default usePersistentState;
