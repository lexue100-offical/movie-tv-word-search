import { applyUpload } from "./apply-upload";
import { pullUpload } from "./pull-upload";
import { commitUpload } from "./commit-upload";

interface VideoServiceParams {
	videoUrl: string;
	videoName?: string;
	coverUrl?: string;
	classId?: number;
}

export const uploadVideoService = async (videos: VideoServiceParams[]) => {
	console.log(videos)
	return Promise.all(videos.map(video => processVideo(video)));
};

const processVideo = async ({
	videoUrl,
	videoName,
	coverUrl,
	classId,
}: VideoServiceParams) => {
	const { VodSessionKey } = await applyUpload();
	await pullUpload({ videoUrl, videoName, coverUrl, classId });
	await commitUpload(VodSessionKey);
};
