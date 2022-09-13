import { useReducer } from "react";
import { useStore } from "@store";
import { UploadModal } from "./UploadModal";

export const UploadTrigger = () => {
	const hasSelectedClips = useStore(s => s.selectedClips.length === 0);
	const [showUploadModal, toggleUploadModal] = useReducer(s => !s, false);

	return (
		<>
			<button
				disabled={hasSelectedClips}
				className="flex items-center btn disabled:btn-disabled"
				onClick={toggleUploadModal}
			>
				{hasSelectedClips ? "请选中视频" : "上传选中视频"}
			</button>
			{showUploadModal && (
				<UploadModal
					open={showUploadModal}
					onClose={toggleUploadModal}
				/>
			)}
		</>
	);
};
