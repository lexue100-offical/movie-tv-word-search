import { Listbox } from "@headlessui/react";
import { useVideoClass } from "@requests";
import { useState } from "react";

export const UploadClassSelector = () => {
	const { data, isLoading } = useVideoClass();
	const [selected, setSelected] = useState(data?.[0]);

	return (
		<Listbox
			as="div"
			value={selected}
			onChange={setSelected}
			className="absolute dropdown top-2 right-3"
		>
			<Listbox.Button className="btn btn-info">
				{isLoading ? "正在获取分类数据" : selected?.ClassName ?? "选择"}
			</Listbox.Button>
			<Listbox.Options className="absolute right-[5%] overflow-y-scroll h-60 dropdown-content menu p-2 shadow bg-base-100 rounded-box">
				{data?.map(classInfo => (
					<Listbox.Option key={classInfo.ClassId} value={classInfo}>
						<span>{classInfo.ClassName}</span>
					</Listbox.Option>
				))}
			</Listbox.Options>
		</Listbox>
	);
};
