import { type ChangeEventHandler, memo, useCallback } from "react";
import shallow from "zustand/shallow";
import type { ClipWithStateProps } from "./";
import { useStore } from "@store";

export const SelectCheckbox = memo((clip: ClipWithStateProps) => {
	const { remove, add } = useStore(
		s => ({
			remove: s.removeClip,
			add: s.addClip,
		}),
		shallow
	);
	const onCheck: ChangeEventHandler<HTMLInputElement> = useCallback(
		e => {
			e.target.checked ? add(clip) : remove(clip.uuid);
		},
		[add, remove, clip]
	);
	return (
		<div className="flex justify-end">
			<label className="label space-x-1 cursor-pointer">
				<span className="label-text">
					{clip.isSelected ? "已选中" : "选中"}
				</span>
				<input
					type="checkbox"
					onChange={onCheck}
					className="checkbox checkbox-primary"
				/>
			</label>
		</div>
	);
});

SelectCheckbox.displayName = "SelectCheckbox";
