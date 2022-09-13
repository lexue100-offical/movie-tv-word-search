import { useUploadVideos } from "@requests";
import { useStore } from "@store";
import { Loader } from "../Loader";
import { AiOutlineCheck } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";

export const ConfirmUpload = ({ closeDialog }: { closeDialog: () => void }) => {
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
		isError ? (
			<ErrorButton retry={uploadVideos} />
		) : (
			<SuccessButton closeDialog={closeDialog} />
		)
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

const SuccessButton = ({ closeDialog }: { closeDialog: () => void }) => (
	<button className="btn btn-outline btn-success" onClick={closeDialog}>
		上传成功
		<AiOutlineCheck className="ml-1" />
	</button>
);

const ErrorButton = ({ retry }: { retry: () => void }) => (
	<button className="btn btn-outline btn-error group" onClick={retry}>
		重新上传 <MdRefresh className="group-hover:animate-spin ml-1" />
	</button>
);
