import { Dialog } from "@headlessui/react";
import { useStore } from "@store";
import { Video } from "../VideoClip/Video";
import { ConfirmUpload } from "./ConfirmUpload";
import { UploadClassSelector } from "./UploadClassSelector";

type DialogProps = Parameters<typeof Dialog>[0];

export const UploadModal = ({ open, onClose }: DialogProps) => {
	const selectedClips = useStore(s => s.selectedClips);

	return (
		<Dialog open={open} onClose={onClose} className="modal modal-open">
			<Dialog.Panel className="realtive modal-box max-w-4xl">
				<UploadClassSelector />
				<Dialog.Title className="text-center text-2xl">
					{`请确认要上传的${selectedClips.length}条视频`}
				</Dialog.Title>
				<Dialog.Description className="mt-1 text-lg">
					<li>{"默认上传标题为'标题-内容'的形式"}</li>
					<li>{"默认用高质量封面图(~20kb)"}</li>
					<li>{"默认上传不带文字的版本"}</li>
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
					<button
						onClick={() => onClose(false)}
						className="btn btn-outline"
					>
						取消
					</button>
					<ConfirmUpload />
				</div>
			</Dialog.Panel>
		</Dialog>
	);
};
