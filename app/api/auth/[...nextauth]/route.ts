import { Account, User as AuthUser } from "next-auth";
import User from "@/app/model/User";
import connect from "../../../lib/dbConnect";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
// Extend the JWT interface for consistent token handling
interface ExtendedJWT extends JWT {
  phone_number?: string;
  role?: string;
}

interface ExtendedUser {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  phone_number?: string;
}

interface AuthResponseDetails {
  // Define the structure of authResponse.details here
  [key: string]: any;
}

interface AuthResponse {
  details: AuthResponseDetails;
}

async function authenticateUser(params: { Email: string; Provider: string }): Promise<AuthResponse | null> {
  // Implementation of authenticateUser
  return null;
}

// Define authentication options using NextAuthOptions interface
export const OPTIONS: NextAuthOptions = {
  // Configure authentication providers
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };
        console.log("Entered authorize function with credentials:", credentials);
        if (email === "" || password === "") {
          console.log("Missing username or password");
          return null;
        }
        try {
          const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
          const url = `${baseUrl}/api/signin`;

          const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          });

          const data = await response.json();
          console.log("Data from backend:", data);

          if (response.ok && data.data && data.data.token) {
            const decodedToken = jwt.decode(data.data.token);
            console.log("decodedToken in authConfig:", decodedToken);

            if (!decodedToken || typeof decodedToken !== "object") {
              return null;
            }
            const user: ExtendedUser = {
              id: data.user.id,
              email: data.user.email,
              token: data.data.token,
            };

            console.log("Returning user:", user);
            return user;
          } else {
            console.log("Authentication failed:", data);
            return null;
          }
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })
  ],

  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider === "google") {
        await connect();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = await User.create({
              name: user.name,
              email: user.email,
            });
            await newUser.save();
            return true;
          }
        } catch (err) {
          console.log("Error occurred while Saving Data", err);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account }): Promise<ExtendedJWT> {
      console.log('token: ', token);
      console.log('user: ', user);
      console.log("Starting jwt callback");

      if (user) {
        console.log("Modifying token with user details");
        token.id = user.id;
        token.email = user.email;
      } else {
        if (account && user) {
          const authResponse = await authenticateUser({
            Email: user.email,
            Provider: account.provider,
          });
          if (authResponse && authResponse.details) {
            token.user = { ...token?.user, ...authResponse?.details };
          }
        }
      }

      console.log("Token object after modification:", token);
      return token;
    },

    async session({ session, token }) {
      console.log('token: ', token);
      console.log('session: ', session);
      if (token) {
        session.user = {
          ...session.user,
          id: typeof token.id === "string" ? token.id : undefined,
          email: typeof token.email === "string" ? token.email : undefined,
        } as ExtendedUser;
      }
      return session;
    },
  },
  
  pages: {
    signIn: "/signin",
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
