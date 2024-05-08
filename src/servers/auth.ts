import { Account, getServerSession } from "next-auth";
import { NextAuthOptions } from "next-auth";

import Credentials from "next-auth/providers/credentials";

import { userService } from "./services/user";
import { JWT } from "next-auth/jwt";

interface Profile {
  id: string;
  name: string;
  email: string;
  sub: string;
  role: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      if (user) return true;

      return false;
    },
    async jwt({ token, account, user }: any) {
      if (account && account.type === "credentials") {
        token.userId = account.providerAccountId;
        token.role = user.role
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session && token && session.user && token.userId && token.role) {
        session.user.id = token.userId;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-in',
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string
          password: string
        };
        return userService.authenticate(username, password);
      }
    })
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
