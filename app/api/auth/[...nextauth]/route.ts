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
  [key: string]: any;  // Define the structure of authResponse.details here
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
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials):Promise<any> {
        const { email, password } = credentials as { email: string; password: string };
        console.log("Entered authorize function with credentials:", credentials);

        if (!email || !password) {
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
            const decodedToken = jwt.decode(data.data.token) as { [key: string]: any };
            console.log("decodedToken in authConfig:", decodedToken);

            if (!decodedToken) {
              return null;
            }

            const user: ExtendedUser = {
              id: decodedToken.userId,  // Assuming `userId` is the key in decoded token
              email: email,
              name: data.user.name,  // Ensure you include 'name' here
              role: decodedToken.role,  // Assuming role is included in JWT
              phone_number: decodedToken.phone_number  // Assuming phone_number is included in JWT
            };

            console.log("Returning user:", user);
            return user;
          } else {
            console.log("Authentication failed:", data.message || "No details provided");
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
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,  // 7 days in seconds
    updateAge: 24 * 60 * 60,   // 24 hours in seconds
  },
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account.provider === "google") {
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
          console.log("Error occurred while saving data:", err);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }): Promise<ExtendedJWT> {
      console.log('Starting jwt callback with token:', token);
      if (user) {
        console.log("Modifying token with user details");
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;  // Ensure role is included if it's part of your user model
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Starting session callback with token:', token);
      if (token) {
        session.user = {
          ...session.user,
           id: token.id,
          email: token.email,
          role: token.role,  // Include additional fields as needed
          name: token.name,  // Include additional fields as needed
        };
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
