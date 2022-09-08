import axios from "axios";

const BASE_URL = "https://memes.getyarn.io/yarn-find";
const NUXT_REGEX = new RegExp(/window\.__NUXT__.*<\/script>/);

export function parseURL(input: string) {
	return decodeURIComponent(
		JSON.parse('"' + input.replace(/\"/g, '\\"') + '"')
	);
}

export const parseResourceService = async (input: string) => {
	const { data } = await axios.get<string>(BASE_URL, {
		params: {
			text: input,
		},
	});
	const firstMatch = data.match(NUXT_REGEX)?.[0];
	if (firstMatch) {
		const videoRegex = /https.*?\.(mp4|jpg|gif|html|png)/g;
		const videos = firstMatch.match(videoRegex);
		return videos?.map(v => parseURL(v));
	}
};
