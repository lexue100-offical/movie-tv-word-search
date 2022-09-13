import shallow from "zustand/shallow";
import { useStore } from "@store";
import type { Clip } from "../../types/nuxt-data";
import { VideoContextProvider } from "./VideoContext";
import { SelectCheckbox } from "./SelectCheckbox";
import { VideoControls } from "./Controls";
import cn from "classnames";
import { Video } from "./Video";

export interface ClipWithStateProps extends Clip {
	isSelected: boolean;
}

export const VideoClip = (clip: ClipWithStateProps) => {
	const { videoTitle, transcript, textMp4, mp4, jpg, jpgMed, isSelected } =
		clip;

	return (
		<VideoContextProvider>
			<div
				className={cn(
					"relative rounded-sm space-y-1 p-1 bg-slate-100",
					isSelected && "outline outline-2 outline-slate-500 shadow"
				)}
			>
				<SelectCheckbox {...clip} />
				<div className="relative">
					<div className="absolute top-0 left-0 text-lg opacity-75 bg-slate-800 text-white">
						{videoTitle}
					</div>
					<Video
						textMp4={textMp4}
						mp4={mp4}
						jpg={jpg}
						className="rounded-sm aspect-video"
					/>
					<div className="absolute bottom-0 left-0 truncate max-w-full text-white">
						{transcript}
					</div>
				</div>
				<div className="flex flex-wrap">
					<div className="flex items-center">
						<VideoControls />
					</div>
				</div>
			</div>
		</VideoContextProvider>
	);
};
