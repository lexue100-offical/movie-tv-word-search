import axios from "axios";
import { genTencentHeaders } from "@utils/crypto";
import { API_URL, SERVICE_NAME,APPLY_UPLOAD_ACTION,UPLOAD_VERSION } from "../constants";

type ApplyUploadResponse = {
	Response: {
		MediaStoragePath: string;
		CoverStoragePath: string;
		StorageBucket: string;
		StorageRegion: string;
		VodSessionKey: string;
		TempCertificate: {
			SecretId: string;
			SecretKey: string;
			Token: string;
			ExpiredTime: number;
		};
		RequestId: string;
		Error?: unknown;
	};
};

/**
 * @see https://cloud.tencent.com/document/product/266/31767
 */
export const applyUpload = async () => {
	const payload = JSON.stringify(
		{
			MediaType: "MP4",
		},
		null,
		"\n"
	);
	const headers = genTencentHeaders(
		SERVICE_NAME,
		APPLY_UPLOAD_ACTION,
		UPLOAD_VERSION,
		API_URL,
		payload
	);
	const { data } = await axios.post<ApplyUploadResponse>(
		`https://${API_URL}`,
		payload,
		{
			headers,
		}
	);
	if (!data.Response.Error) return data.Response;
	return {} as unknown as ApplyUploadResponse["Response"];
};
