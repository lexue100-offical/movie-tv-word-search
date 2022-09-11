import { applyUpload } from "./apply-upload";
import { pullUpload } from "./pull-upload";
import { commitUpload } from "./commit-upload";

interface VideoServiceParams {
	videoUrl: string;
	videoName?: string;
	coverUrl?: string;
}

export const uploadVideoService = async (videos: VideoServiceParams[]) => {
	return Promise.all(videos.map(video => processVideo(video)));
};

const processVideo = async ({
	videoUrl,
	videoName,
	coverUrl,
}: VideoServiceParams) => {
	const { VodSessionKey } = await applyUpload();
	await pullUpload({ videoUrl, videoName, coverUrl });
	const {} = await commitUpload(VodSessionKey);
};
