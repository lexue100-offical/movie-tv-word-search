import { Listbox } from "@headlessui/react";
import { useVideoClass } from "@requests";
import { useStore } from "@store";

export const UploadClassSelector = () => {
	const { data } = useVideoClass();
	const videoClass = useStore(s => s.videoClass);
	const setVideoClass = useStore(s => s.setVideoClass);

	return (
		<Listbox
			as="div"
			value={videoClass}
			onChange={setVideoClass}
			className="absolute dropdown top-2 right-3"
		>
			<Listbox.Button className="btn btn-info">
				{data
					? data.find(
							classInfo =>
								classInfo.ClassId === videoClass?.ClassId
					  )?.ClassName ?? "选择存储分类"
					: "正在获取存储分类数据"}
			</Listbox.Button>
			<Listbox.Options className="absolute right-[5%] overflow-y-scroll h-60 dropdown-content menu p-2 shadow bg-base-100 rounded-box">
				{data?.map(classInfo => (
					<Listbox.Option
						key={classInfo.ClassId}
						value={classInfo}
						className="ui-selected:bg-success ui-active:bg-info"
					>
						<span>{classInfo.ClassName}</span>
					</Listbox.Option>
				))}
			</Listbox.Options>
		</Listbox>
	);
};
