import { useState, useId, useCallback } from "react";
import shallow from "zustand/shallow";
import { useStore } from "@store";
import type { Clip } from "../../types/nuxt-data";
import { SelectCheckbox } from "./SelectCheckbox";
import cn from "classnames";

interface VideoClipProps extends Clip {
	isSelected: boolean;
}


export const VideoClip = (clip: VideoClipProps) => {
	const { textMp4, mp4, jpg, isSelected } = clip;
	const id = useId();
	const [textClip, setTextClip] = useState<boolean>(true);
	const [muted, setMuted] = useState(true);

	return (
		<div
			className={cn(
				"rounded-sm space-y-1 p-1",
				isSelected && "outline outline-2 outline-teal-200"
			)}
		>
			<SelectCheckbox {...clip} />
			<video
				className="rounded-sm"
				src={textClip ? textMp4 : mp4}
				poster={jpg}
				muted={muted}
				loop
				autoPlay
			/>
			<div className="flex flex-wrap">
				<div className="flex items-center">
					<button onClick={() => setMuted(s => !s)}>静音</button>
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
