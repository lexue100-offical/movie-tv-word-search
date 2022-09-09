import type { NextPage } from "next";
import Head from "next/head";
import { Search, VideoClip } from "../components";
import { useResources } from "../requests";
import { getNuxtData } from "../utils/getNuxtData";

const Home: NextPage = () => {
	const { data } = useResources();
	const clips = getNuxtData(data);

	return (
		<>
			<Head>
				<title>Create T3 App</title>
				<meta name="description" content="Generated by create-t3-app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-3 space-y-2">
				<Search />
				<div className="rounded grid grid-cols-4 gap-3">
					{clips?.map(clip => (
						<VideoClip key={clip.uuid} {...clip} />
					))}
				</div>
				<footer>
					<button>prev</button>
					<button>next</button>
				</footer>
				<pre>{JSON.stringify(clips, null, 2)}</pre>
			</main>
		</>
	);
};

export default Home;
