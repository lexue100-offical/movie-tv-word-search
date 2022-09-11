import { useUploadVideos } from "@requests";
import { useStore } from "@store";
import { Loader } from "../Loader";

export const ConfirmUpload = () => {
	const { mutate, isLoading } = useUploadVideos();
	const clips = useStore(s => s.selectedClips);
	const uploadVideos = () => {
		mutate(
			clips.map(clip => ({
				videoUrl: clip.mp4,
				videoName: clip.transcriptShort,
				coverUrl: clip.jpg,
			}))
		);
	};
	return (
		<button
			disabled={clips.length === 0 || isLoading}
			className="flex items-center btn disabled:btn-disabled"
			onClick={uploadVideos}
		>
			上传视频 {isLoading && <Loader className="ml-1" />}
		</button>
	);
};
