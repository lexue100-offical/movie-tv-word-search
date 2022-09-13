import { trpc } from "@utils/trpc";

export const useVideoClass = () => {
	return trpc.useQuery(["video.videoClass"], {
        refetchOnWindowFocus: false
    });
};
