import axios from "axios";
import {
	SERVICE_NAME,
	PULL_UPLOAD_ACTION,
	UPLOAD_VERSION,
	API_URL,
} from "./constants";
import { genTencentHeaders } from "@utils/crypto";

interface PullUploadParms {
	videoUrl: string;
	videoName?: string;
}

interface PullUploadResponse {
	Response: {
		TaskId: string;
		RequestId: string;
		Error?: unknown;
	};
}

export const pullUpload = async ({ videoName, videoUrl }: PullUploadParms) => {
	const payload = JSON.stringify(
		{
			MediaUrl: videoUrl,
			MediaName: videoName,
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
