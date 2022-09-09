import axios from "axios";
import {
	SERVICE_NAME,
	COMMIT_UPLOAD_ACTION,
	UPLOAD_VERSION,
	API_URL,
} from "./constants";
import { genTencentHeaders } from "@utils/crypto";

interface CommitUploadParms {
	vodSessionKey: string;
}

interface PullUploadResponse {
	Response: {
		TaskId: string;
		RequestId: string;
		Error?: unknown;
	};
}

export const commitUpload = async (vodSessionKey: string) => {
	const payload = JSON.stringify(
		{
			VodSessionKey: vodSessionKey,
		},
		null,
		"\n"
	);
	const headers = genTencentHeaders(
		SERVICE_NAME,
		COMMIT_UPLOAD_ACTION,
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
	console.log("commit", data);
	return data;
};
