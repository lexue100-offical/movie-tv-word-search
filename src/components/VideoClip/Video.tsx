import { useContext, type ComponentProps } from "react";
import { VideoContext } from "./VideoContext";

interface VideoProps extends ComponentProps<"video"> {
	textMp4: string;
	mp4: string;
	jpg: string;
}

export const Video = ({ textMp4, mp4, jpg, ...props }: VideoProps) => {
	const { muted, textClip } = useContext(VideoContext);

	return (
		<video
			loop
			autoPlay
			src={textClip ? textMp4 : mp4}
			poster={jpg}
			muted={muted}
			{...props}
		/>
	);
};
