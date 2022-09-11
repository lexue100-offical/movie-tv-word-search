import { useContext, useId } from "react";
import { VideoContext } from "../VideoContext";

export const TextClipControl = () => {
	const id = useId();
	const { textClip, toggleTextClip } = useContext(VideoContext);
	return (
		<div>
			<input
				id={id}
				type="checkbox"
				className="toggle"
				checked={textClip}
				onChange={toggleTextClip}
			/>
			<label htmlFor={id}>显示字</label>
		</div>
	);
};
