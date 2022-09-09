import { trpc } from "@utils/trpc";

export const useUploadVideos = () => {
	return trpc.useMutation(["upload.uploadVideo"]);
};
