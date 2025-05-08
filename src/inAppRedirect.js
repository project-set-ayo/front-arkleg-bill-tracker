/*
  Prevent Google Authentication Error
  for disallowed user agents (i.e in-app browsers)
*/
const userAgent = window.navigator.userAgent;
const url = window.location.href;
const inAppBrowsers = [
	"FBAN", // Facebook
	"FBAV", // Facebook
	"Instagram", // Instagram
	"LinkedInApp", // LinkedIn
	"GSA", // Gmail
	"Twitter", // Twitter/X
	"Snapchat", // Snapchat
	"Pinterest", // Pinterest
];

if (
	userAgent.includes("Mobile") &&
	/iPhone|iPad/.test(userAgent) &&
	inAppBrowsers.some((app) => userAgent.includes(app))
) {
	window.location.href = "x-safari-" + url;
	return;
}
