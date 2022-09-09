import { parseResourceService } from "../service/parse-resource";
import { createRouter } from "./context";
import { z } from "zod";

export const resourcesRouter = createRouter().query("resources", {
	input: z.object({
		searchTerm: z.string(),
		page: z.number().optional(),
	}),
	async resolve({ input }) {
		const rawString = await parseResourceService(input);

		return rawString;
	},
});
