import axios from "axios";
import {
	SERVICE_NAME,
	PULL_UPLOAD_ACTION,
	UPLOAD_VERSION,
	API_URL,
} from "../constants";
import { genTencentHeaders } from "@utils/crypto";

interface PullUploadParms {
	videoUrl: string;
	videoName?: string;
	coverUrl?: string;
	classId?: number;
}

interface PullUploadResponse {
	Response: {
		TaskId: string;
		RequestId: string;
		Error?: unknown;
	};
}

/**
 *
 * @see https://cloud.tencent.com/document/product/266/31767
 */
export const pullUpload = async ({
	videoName,
	videoUrl,
	coverUrl,
	classId,
}: PullUploadParms) => {
	const payload = JSON.stringify(
		{
			MediaUrl: videoUrl,
			MediaName: videoName,
			CoverUrl: coverUrl,
			ClassId: classId,
		},
		null,
		"\n"
	);
	const headers = genTencentHeaders(
		SERVICE_NAME,
		PULL_UPLOAD_ACTION,
		UPLOAD_VERSION,
		API_URL,
		payload
	);
	const { data } = await axios.post<PullUploadResponse>(
		`https://${API_URL}`,
		payload,
		{
			headers,
		}
	);
	return data.Response.TaskId;
};
