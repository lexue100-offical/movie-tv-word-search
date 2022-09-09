import { ChangeEventHandler, memo, useCallback, useId } from "react";
import shallow from "zustand/shallow";
import type { Clip } from "../../types/nuxt-data";
import { useStore } from "@store";

export const SelectCheckbox = memo((clip: Clip) => {
	const id = useId();
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
			<input id={id} type="checkbox" onChange={onCheck} />
			<label htmlFor={id}>已选中</label>
		</div>
	);
});

SelectCheckbox.displayName = "SelectCheckbox"