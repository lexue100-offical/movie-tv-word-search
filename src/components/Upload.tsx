import { useUploadVideos } from "@requests";
import { useStore } from "@store";
import { Loader } from "./Loader";

export const Upload = () => {
	const { mutate, isLoading } = useUploadVideos();
	const clips = useStore(s => s.selectedClips);
	const uploadVideos = () => {
		mutate(
			clips.map(clip => ({
				videoUrl: clip.mp4,
				videoName: clip.transcriptShort,
			}))
		);
	};
	return (
		<button
			disabled={clips.length === 0 || isLoading}
			className="flex items-center btn disabled:btn-disabled"
			onClick={uploadVideos}
		>
			Upload {isLoading && <Loader className="ml-1" />}
		</button>
	);
};
