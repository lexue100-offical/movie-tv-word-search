const daisyui = require("daisyui");
const headlessui = require("@headlessui/tailwindcss")({ prefix: "ui" });

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			boxShadow: ({ colors, rgb }) => ({
				glow: `0 0 0 3px ${colors}`,
			}),
			transitionDuration: {
				750: 750,
			},
		},
	},
	plugins: [daisyui, headlessui],
};
