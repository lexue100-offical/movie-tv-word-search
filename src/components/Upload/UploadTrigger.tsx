import { useReducer } from "react";
import { useStore } from "@store";
import { UploadModal } from "./UploadModal";

export const UploadTrigger = () => {
	const disabled = useStore(s => s.selectedClips.length === 0);
	const [showUploadModal, toggleUploadModal] = useReducer(s => !s, false);

	return (
		<>
			<button
				disabled={disabled}
				className="flex items-center btn disabled:btn-disabled"
				onClick={toggleUploadModal}
			>
				申请上传视频
			</button>
			{showUploadModal && <UploadModal />}
		</>
	);
};
