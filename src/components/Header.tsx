import { memo } from "react";
import { Search } from "./Search";
import { UploadTrigger } from "./Upload/UploadTrigger";
import { Filters } from "./Filters";

export const Header = memo(({ hasVideo }: { hasVideo: boolean }) => {
	return (
		<div className="flex space-x-3 items-center">
			<Search />
			<Filters />
			{hasVideo && <UploadTrigger />}
		</div>
	);
});

Header.displayName = "Header";
