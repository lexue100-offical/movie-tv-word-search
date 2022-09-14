import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { Header, VideoClip, Footer } from "../components";
import { useStore } from "@store";
import { useResources } from "../requests";
import { filterVideos } from "@utils/filters";

const Home: NextPage = () => {
	const { data } = useResources();
	const hasVideo = !!(data && data.clips?.length);
	const selectedClips = useStore(s => s.selectedClips);
	const videoFilters = useStore(s => s.videoFilters);
	const videos = filterVideos(data?.clips, videoFilters);

	return (
		<>
			<Head>
				<title>乐学-英语素材处理😎</title>
			</Head>
			<main className="bg-slate-50 container mx-auto flex flex-col items-center justify-center min-h-screen px-2 py-3 space-y-2">
				<Header hasVideo={hasVideo} />
				{videos && (
					<motion.div
						layout
						className="rounded grid grid-cols-4 gap-3"
					>
						{videos.map(clip => (
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
					</motion.div>
				)}
				<Footer />
			</main>
		</>
	);
};

export default Home;
