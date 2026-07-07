import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from './db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: { workspaceId: true, role: true },
        });
        (session.user as any).workspaceId = dbUser?.workspaceId;
        (session.user as any).role = dbUser?.role;
      }
      return session;
    },
    async signIn({ user }) {
      if (!user.email) return false;
      const existing = await db.user.findUnique({ where: { email: user.email } });
      if (!existing) {
        const workspace = await db.workspace.create({
          data: {
            name: `${user.name?.split(' ')[0]}'s Workspace`,
            slug: `ws-${Date.now()}`,
            plan: 'STARTER',
          },
        });
        await db.user.update({
          where: { email: user.email },
          data: { workspaceId: workspace.id, role: 'OWNER' },
        });
      }
      return true;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: { strategy: 'database' },
};