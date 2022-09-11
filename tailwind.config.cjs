const daisyui = require("daisyui");
const headlessui = require("@headlessui/tailwindcss")({ prefix: "ui" });

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [daisyui, headlessui],
};
