import { createHash, createHmac } from "crypto";

function sha256(
	message: string,
	secret: string | Buffer = "",
	encoding?: "hex" | "base64"
) {
	const hmac = createHmac("sha256", secret);
	return encoding
		? hmac.update(message).digest(encoding)
		: hmac.update(message).digest();
}

function getHash(message: string, encoding: "hex" | "base64" = "hex") {
	const hash = createHash("sha256");
	return hash.update(message).digest(encoding);
}

function getDate(timestamp: number) {
	const date = new Date(timestamp * 1000);
	const year = date.getUTCFullYear();
	const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
	const day = ("0" + date.getUTCDate()).slice(-2);
	return `${year}-${month}-${day}`;
}

export function genTencentHeaders(
	service: string,
	action: string,
	version: string,
	url: string,
	payload: string
) {
	const timestamp = Math.round(new Date().getTime() / 1000);
	//时间处理, 获取世界时间日期
	const date = getDate(timestamp);
	// ************* 步骤 1：拼接规范请求串 *************
	const signedHeaders = "content-type;host";
	const hashedRequestPayload = getHash(payload);
	const httpRequestMethod = "POST";
	const canonicalUri = "/";
	const canonicalQueryString = "";
	const canonicalHeaders =
		"content-type:application/json; charset=utf-8\n" + "host:" + url + "\n";

	const canonicalRequest =
		httpRequestMethod +
		"\n" +
		canonicalUri +
		"\n" +
		canonicalQueryString +
		"\n" +
		canonicalHeaders +
		"\n" +
		signedHeaders +
		"\n" +
		hashedRequestPayload;

	// ************* 步骤 2：拼接待签名字符串 *************
	const algorithm = "TC3-HMAC-SHA256";
	const hashedCanonicalRequest = getHash(canonicalRequest);
	const credentialScope = date + "/" + service + "/" + "tc3_request";
	const stringToSign =
		algorithm +
		"\n" +
		timestamp +
		"\n" +
		credentialScope +
		"\n" +
		hashedCanonicalRequest;

	const kDate = sha256(date, "TC3" + process.env.TENCENT_SECRET_KEY);
	const kService = sha256(service, kDate);
	const kSigning = sha256("tc3_request", kService);
	const signature = sha256(stringToSign, kSigning, "hex");

	const authorization =
		algorithm +
		" " +
		"Credential=" +
		process.env.TENCENT_SECRET_ID +
		"/" +
		credentialScope +
		", " +
		"SignedHeaders=" +
		signedHeaders +
		", " +
		"Signature=" +
		signature;

	return {
		Authorization: authorization,
		"Content-Type": "application/json; charset=utf-8",
		Host: url,
		"X-TC-Action": action,
		"X-TC-Timestamp": timestamp.toString(),
		"X-TC-Version": version,
		"X-TC-Region": "ap-beijing",
	};
}
