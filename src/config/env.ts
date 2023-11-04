import { str, envsafe, port, url, email } from "envsafe";

export const env = envsafe({
  PORT: port({
    devDefault: 4503,
    desc: "The app is running on",
    example: 80,
  }),
  NODE_ENV: str({
    devDefault: "development",
    choices: ["development", "production"],
  }),
  // database
  DATABASE_DEV_URI: url(),
  DATABASE_PROD_URI: url(),

  //  Role Secret
  USER_ROLE: str(),
  ADMIN_ROLE: str(),
  SUPERADMIN_ROLE: str(),

  // access token
  ACCESS_TOKEN_PRIVATE: str(),
  ACCESS_TOKEN_PUBLIC: str(),

  // refresh token
  REFRESH_TOKEN_PRIVATE: str(),
  REFRESH_TOKEN_PUBLIC: str(),
});
