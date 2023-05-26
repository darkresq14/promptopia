import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '../../../../models/user';
import { connectToDatabase } from '../../../../utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        // serverless => lambda -> dynamodb
        await connectToDatabase();
        // check if a user already exists
        if (profile) {
          const userExists = await User.findOne({
            email: profile.email,
          });
          // if not, create a new user
          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name
                ? profile.name.replace(' ', '').toLowerCase()
                : '',
              image: profile.picture,
            });
          }
          return true;
        } else {
          console.log('Profile is undefined');
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
