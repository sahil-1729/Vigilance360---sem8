import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";

import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/signin",
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // console.log("credentials ", credentials);
        const userExist = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // console.log("user exist ", userExist);
        if (!userExist) {
          return null;
        }

        const matchPass = await compare(
          credentials.password,
          userExist.password
        );

        console.log(
          "match pass ",
          matchPass,
          " ",
          userExist.password,
          " ",
          credentials.password
        );

        if (!matchPass) {
          return null;
        }

        return {
          id: userExist.id + "",
          name: userExist.name,
          email: userExist.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log("jwt ", user);

      if (user) {
        return {
          ...token,
          name: user.name,
        };
      }
      return { ...token };
    },
    async session({ session, token }) {
      console.log(session, token);

      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
        },
      };
    },
  },
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
