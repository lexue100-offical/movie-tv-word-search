import { Search } from "./Search";
import { Upload } from "./Upload";

export const Header = () => {
	return (
		<div className="flex space-x-3 items-center">
			<Search />
			<Upload />
		</div>
	);
};
