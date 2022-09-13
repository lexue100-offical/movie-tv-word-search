import { genTencentHeaders } from "@utils/crypto";
import axios from "axios";
import {
	API_URL,
	DESCRIBE_ALL_CLASS_ACTION,
	SERVICE_NAME,
	UPLOAD_VERSION,
} from "../constants";

type ClassInfo = {
	ClassId: number;
	ClassName: string;
	Level: number;
	Name: string;
	ParentId: number;
	SubClassIdSet: string[];
};

type GetVideoClassResponse = {
	Response: {
		ClassInfoSet: ClassInfo[];
		RequestId: string;
		Error?: unknown;
	};
};

/**
 * @see https://cloud.tencent.com/document/product/266/31770
 */
export const getVideoClassService = async () => {
	const payload = JSON.stringify({}, null, "\n");
	const headers = genTencentHeaders(
		SERVICE_NAME,
		DESCRIBE_ALL_CLASS_ACTION,
		UPLOAD_VERSION,
		API_URL,
		payload
	);
	const { data } = await axios.post<GetVideoClassResponse>(
		`https://${API_URL}`,
		payload,
		{
			headers,
		}
	);

	return data.Response.ClassInfoSet;
};
