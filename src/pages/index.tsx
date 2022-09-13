import type { NextPage } from "next";
import { Header, VideoClip, Footer } from "../components";
import { useStore } from "@store";
import { useResources } from "../requests";

const Home: NextPage = () => {
	const { data } = useResources();
	const selectedClips = useStore(s => s.selectedClips);

	return (
		<main className="bg-slate-50 container mx-auto flex flex-col items-center justify-center min-h-screen px-2 py-3 space-y-2">
			<Header />
			{data?.clips && (
				<div className="rounded grid grid-cols-4 gap-3">
					{data.clips.map(clip => (
						<VideoClip
							key={clip.uuid}
							{...clip}
							isSelected={
								!!selectedClips.find(
									selected => selected.uuid === clip.uuid
								)
							}
						/>
					))}
				</div>
			)}
			<Footer />
		</main>
	);
};

export default Home;
