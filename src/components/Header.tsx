import { Search } from "./Search";
import { Download } from "./Download";

export const Header = () => {
	return (
		<div className="flex space-x-3 items-center">
			<Search />
			<Download />
		</div>
	);
};
