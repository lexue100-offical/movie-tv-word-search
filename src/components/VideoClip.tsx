import type { Clip } from "../types/nuxt-data";
import { useState } from "react";

export const VideoClip = ({ mp4, jpg }: Clip) => {
	const [textClip, setTextClip] = useState<boolean>(false);

	return (
		<div className="rounded-sm">
			<video
				className="rounded-sm"
				src={mp4}
				poster={jpg}
				muted
				loop
				autoPlay
			/>
			<div>
				<button></button>
			</div>
		</div>
	);
};
