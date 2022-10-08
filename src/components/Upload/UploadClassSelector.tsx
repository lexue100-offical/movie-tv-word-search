import { Listbox } from "@headlessui/react";
import { TbFilter, TbFilterOff } from "react-icons/tb";
import { useVideoClass } from "@requests";
import { useStore } from "@store";
import { useState } from "react";

export const UploadClassSelector = () => {
	const { data } = useVideoClass();
	const [filter, setFilter] = useState(true);
	const videoClass = useStore(s => s.videoClass);
	const setVideoClass = useStore(s => s.setVideoClass);
	const processedData = filter
		? data?.filter(v => v.ClassName.includes("小初高词汇视频"))
		: data;
	const FilterComponent = filter ? TbFilterOff : TbFilter;

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
				<FilterComponent
					className="h-5 w-5"
					onClick={e => {
						e.stopPropagation();
						setFilter(f => !f);
					}}
				/>
			</Listbox.Button>
			<Listbox.Options className="absolute right-[5%] overflow-y-scroll h-60 dropdown-content menu p-2 shadow bg-base-100 rounded-box">
				{processedData?.map(classInfo => (
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
