import { createContext } from "react";

interface VideoClipState {
	muted: boolean;
	toggleMuted: () => void;
}

export const VideoContext = createContext<VideoClipState>({
	muted: true,
	toggleMuted: () => {},
});
