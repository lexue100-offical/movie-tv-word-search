import type { Clip } from "../../types/nuxt-data";
import { VideoContextProvider } from "./VideoContext";
import { SelectCheckbox } from "./SelectCheckbox";
import { VideoControls } from "./Controls";
import cn from "classnames";
import { Video } from "./Video";
import { motion } from "framer-motion";

export interface ClipWithStateProps extends Clip {
	isSelected: boolean;
}

export const VideoClip = (clip: ClipWithStateProps) => {
	const { videoTitle, transcript, textMp4, mp4, jpg, jpgMed, isSelected } =
		clip;

	return (
		<VideoContextProvider>
			<motion.div
				layout
				className={cn(
					"relative rounded-sm space-y-1 p-1 bg-slate-100",
					isSelected && "outline outline-2 outline-slate-500 shadow"
				)}
			>
				<SelectCheckbox {...clip} />
				<div className="relative">
					<p className="absolute top-0 left-0 opacity-75 bg-slate-800 text-white">
						{videoTitle}
					</p>
					<Video
						textMp4={textMp4}
						mp4={mp4}
						jpg={jpg}
						className="rounded-sm aspect-video"
					/>
					<p className="absolute bottom-0 left-0 truncate max-w-full text-white">
						{transcript}
					</p>
				</div>
				<div className="flex flex-wrap">
					<div className="flex items-center">
						<VideoControls />
					</div>
				</div>
			</motion.div>
		</VideoContextProvider>
	);
};
