import { NextAuthConfig } from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
// import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    // Credentials,
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ]
} satisfies NextAuthConfig