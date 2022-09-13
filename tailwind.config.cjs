const daisyui = require("daisyui");
const headlessui = require("@headlessui/tailwindcss")({ prefix: "ui" });

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			boxShadow: {
				glow: "0 0 0 3px rgba(9, 105, 218, 0.3)",
			},
		},
	},
	plugins: [daisyui, headlessui],
};
