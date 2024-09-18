import { google } from "googleapis";
import config from "./config";

const OAuth2 = google.auth.OAuth2;
const CLIENT_ID = config.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = config.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = config.GOOGLE_REDIRECT_URL;

export const googleClient = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
