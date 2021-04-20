declare namespace NodeJS {
  interface ProcessEnv {
    FIREBASE_API_KEY: string;
    FIREBASE_AUTH_DOMAIN: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_STORAGE_BUCKET: string;
    FIREBASE_MESSAGING_SENDER_ID: string;
    FIREBASE_APP_ID: string;
    FIREBASE_MEASUREMENT_ID: string;
    AUTH0_DOMAIN: string;
    CLIENT_ID: string;
    API_IDENTIFIER: string;
  }
}