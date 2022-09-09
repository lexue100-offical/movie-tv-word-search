import { applyUpload } from "./apply-upload";
import { pullUpload } from "./pull-upload";
import { commitUpload } from "./commit-upload";

interface VideoServiceParams {
	videoUrl: string;
	videoName?: string;
}

export const uploadVideoService = async (videos: VideoServiceParams[]) => {
	return Promise.all(videos.map(video => processVideo(video)));
};

const processVideo = async ({ videoUrl, videoName }: VideoServiceParams) => {
	const { MediaStoragePath, VodSessionKey } = await applyUpload();
	const taskId = await pullUpload({ videoUrl, videoName });
	const {} = await commitUpload(VodSessionKey);
};
