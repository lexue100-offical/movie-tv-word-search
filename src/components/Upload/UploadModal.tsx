import { Dialog } from "@headlessui/react";
import { useStore } from "@store";
import { Video } from "../VideoClip/Video";
import { ConfirmUpload } from "./ConfirmUpload";

export const UploadModal = ({ open, onClose }) => {
	const selectedClips = useStore(s => s.selectedClips);

	return (
		<Dialog open={open} onClose={onClose} className="modal modal-open">
			<Dialog.Panel className="modal-box max-w-4xl">
				<Dialog.Title className="text-center text-2xl">
					{`请确认要上传的视频${selectedClips.length}条`}
				</Dialog.Title>
				<Dialog.Description className="text-lg">
					{"默认上传标题为'标题-内容'的形式"}
				</Dialog.Description>
				<div className="grid grid-cols-3 gap-2">
					{selectedClips.map(clip => (
						<Video
							key={clip.uuid}
							className="aspect-square"
							textMp4={clip.textMp4}
							mp4={clip.mp4}
							jpg={clip.jpg}
						/>
					))}
				</div>
				<div className="modal-action">
					<button onClick={onClose} className="btn btn-ghost">
						取消
					</button>
					<ConfirmUpload />
				</div>
			</Dialog.Panel>
		</Dialog>
	);
};
