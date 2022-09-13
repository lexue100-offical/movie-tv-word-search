import { useUploadVideos } from "@requests";
import { useStore } from "@store";
import { Loader } from "../Loader";
import cn from "classnames";

export const ConfirmUpload = () => {
	const { mutate, isLoading, isSuccess, isError } = useUploadVideos();
	const clips = useStore(s => s.selectedClips);
	const uploadVideos = () => {
		mutate(
			clips.map(clip => ({
				videoUrl: clip.mp4,
				videoName: `${clip.videoTitle}-${clip.transcriptShort}`,
				coverUrl: clip.jpgMed,
			}))
		);
	};

	return (
		<button
			disabled={clips.length === 0 || isLoading || isSuccess}
			className={cn(
				isSuccess && "!btn-success",
				"flex items-center btn disabled:btn-disabled"
			)}
			onClick={uploadVideos}
		>
			{isError ? "上传失败" : isSuccess ? "上传成功" : "上传视频"}
			{isLoading && <Loader className="ml-1" />}
		</button>
	);
};
