import { parseResourceService } from "../service/parse-resource";
import { createRouter } from "./context";
import { z } from "zod";

export const resourcesRouter = createRouter()
	.query("resources", {
		input: z.object({
			text: z.string(),
		}),
		async resolve({ input }) {
			const { text } = input;
			const data = await parseResourceService(text);
			return {
				data,
			};
		},
	})
