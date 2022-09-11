import { useStore } from "@store";
import { Video } from "../VideoClip/Video";
import { ConfirmUpload } from "./ConfirmUpload";

export const UploadModal = () => {
	const selectedClips = useStore(s => s.selectedClips);

	return (
		<div className="modal modal-open cursor-pointer">
			<div className="modal-box">
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
                    <button className="btn btn-ghost">取消</button>
					<ConfirmUpload />
				</div>
			</div>
		</div>
	);
};
