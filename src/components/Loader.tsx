import type { IconBaseProps } from "react-icons";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import cn from "classnames";

export const Loader = ({ className, ...props }: IconBaseProps) => (
	<AiOutlineLoading3Quarters
		className={cn("animate-spin", className)}
		{...props}
	/>
);
