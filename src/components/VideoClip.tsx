import type { Clip } from "../types/nuxt-data";
import { useState, useId } from "react";

export const VideoClip = ({ textMp4, mp4, jpg }: Clip) => {
	const id = useId();
	const [textClip, setTextClip] = useState<boolean>(true);

	return (
		<div className="rounded-sm space-y-1">
			<div className="flex justify-end">
				<input type="checkbox" />
				<label htmlFor={id}>已选中</label>
			</div>
			<video
				className="rounded-sm"
				src={textClip ? textMp4 : mp4}
				poster={jpg}
				muted
				loop
				autoPlay
			/>
			<div className="flex flex-wrap">
				<div className="flex items-center">
					<input
						id={id}
						type="checkbox"
						className="toggle"
						checked={textClip}
						onChange={e => setTextClip(e.target.checked)}
					/>
					<label htmlFor={id}>显示字</label>
				</div>
			</div>
		</div>
	);
};
