import { uploadVideoService } from "../service/upload-video";
import { createRouter } from "./context";
import { z } from "zod";

export const uploadRouter = createRouter().mutation("uploadVideo", {
	input: z.array(
		z.object({
			videoUrl: z.string(),
			videoName: z.string().optional(),
			coverUrl: z.string().optional()
		})
	),
	async resolve({ input }) {
		await uploadVideoService(input);

		return 111;
	},
});
