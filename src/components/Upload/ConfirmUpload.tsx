import { useUploadVideos } from "@requests";
import { useStore } from "@store";
import { Loader } from "../Loader";
import cn from "classnames";

export const ConfirmUpload = () => {
	const { mutate, isLoading, isSuccess, isError } = useUploadVideos();
	const clips = useStore(s => s.selectedClips);
	const classId = useStore(s => s.videoClass?.ClassId);
	const uploadVideos = () => {
		mutate(
			clips.map(clip => ({
				videoUrl: clip.mp4,
				videoName: `${clip.videoTitle}-${clip.transcriptShort}`,
				coverUrl: clip.jpgMed,
				classId,
			}))
		);
	};

	return isSuccess || isError ? (
		<button className="btn">{isError ? "重新上传" : "上传成功"}</button>
	) : (
		<button
			autoFocus
			disabled={clips.length === 0 || isLoading}
			className="flex items-center btn btn-primary disabled:btn-disabled"
			onClick={uploadVideos}
		>
			确认上传 {isLoading && <Loader className="ml-1" />}
		</button>
	);
};
