import {
	createContext,
	useState,
	type ReactNode,
	type ChangeEvent,
	type ChangeEventHandler,
} from "react";

interface VideoClipState {
	muted: boolean;
	toggleMuted: () => void;
	textClip: boolean;
	toggleTextClip: ChangeEventHandler;
}

export const VideoContext = createContext<VideoClipState>({
	muted: true,
	toggleMuted: () => {},
	textClip: true,
	toggleTextClip: () => {},
});

export const VideoContextProvider = ({ children }: { children: ReactNode }) => {
	const [muted, setMuted] = useState<boolean>(true);
	const [textClip, setTextClip] = useState<boolean>(true);
	const toggleMuted = () => setMuted(m => !m);
	const toggleTextClip = (e: ChangeEvent<HTMLInputElement>) =>
		setTextClip(e.target.checked);

	return (
		<VideoContext.Provider
			value={{ muted, toggleMuted, textClip, toggleTextClip }}
		>
			{children}
		</VideoContext.Provider>
	);
};
