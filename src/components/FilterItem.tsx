import { ChangeEventHandler, ComponentProps, useCallback } from "react";
import { useStore, type VideoFilter } from "@store";
import { Menu } from "@headlessui/react";

export interface FilterItemProps extends ComponentProps<"li"> {
	selectorName: VideoFilter;
	title: string;
}

export const FilterItem = ({
	selectorName,
	title,
	...props
}: FilterItemProps) => {
	const isFiltering = useStore(s => s.videoFilters.includes(selectorName));
	const addVideoFilter = useStore(s => s.addVideoFilter);
	const removeVideoFilter = useStore(s => s.removeVideoFilter);
	const onCheck: ChangeEventHandler<HTMLInputElement> = useCallback(
		e => {
			e.target.checked
				? addVideoFilter(selectorName)
				: removeVideoFilter(selectorName);
		},
		[addVideoFilter, removeVideoFilter, selectorName]
	);

	return (
		<Menu.Item as="li" {...props}>
			<label className="label cursor-pointer">
				<span className="label-text">{title}</span>
				<input
					type="checkbox"
					onChange={onCheck}
					checked={isFiltering}
					className="checkbox checkbox-accent"
				/>
			</label>
		</Menu.Item>
	);
};
