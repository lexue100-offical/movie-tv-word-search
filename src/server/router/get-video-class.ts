import { getVideoClassService } from "../service/get-video-class";
import { createRouter } from "./context";

export const getVideoClassRouter = createRouter().query("videoClass", {
	async resolve() {
		const data = await getVideoClassService();
		return data;
	},
});
