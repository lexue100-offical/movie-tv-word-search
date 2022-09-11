import { useContext } from "react";
import { VideoContext } from "../VideoContext";

export const MuteControl = () => {
	const { muted, toggleMuted } = useContext(VideoContext);

	return (
		<button className="btn" onClick={toggleMuted}>
			{muted ? "取消静音" : "静音"}
		</button>
	);
};
