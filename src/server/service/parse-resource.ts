import axios from "axios";

const BASE_URL = "https://memes.getyarn.io/yarn-find";

// Non greedy regex to get raw string
const NUXT_REGEX = new RegExp(/window\.__NUXT__.*?<\/script>/);

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
	// This should return the content inside window.__NUXT__
	const firstMatch = data.match(NUXT_REGEX)?.[0]?.replace(/<\/script>/, "");

	return firstMatch;
};

// only parse resouces that are useful
export const parseVideos = (data: string) => {
	const videoRegex = /https.*?\.(mp4|jpg|gif|html|png)/g;
	const videos = data.match(videoRegex);
	return videos;
};
