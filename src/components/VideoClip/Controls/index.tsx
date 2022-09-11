import { MuteControl } from "./MuteControl";
import { TextClipControl } from "./TextClipControl";

export const VideoControls = () => {
	return (
		<div className="flex items-center">
			<MuteControl />
			<TextClipControl />
		</div>
	);
};
