import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { getUserByEmail } from '@/lib/db' // Your database query logic
import { verifyPassword } from '@/lib/hash' // Password check logic

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = await getUserByEmail(credentials.email)

        if (!user) {
          throw new Error('User not found. Please sign up first.')
        }

        // If the user registered with Google, block credentials login
        if (user.provider === 'google') {
          throw new Error('This email is linked with Google. Use "Continue with Google" instead.')
        }

        const isValid = await verifyPassword(credentials.password, user.password)
        if (!isValid) {
          throw new Error('Incorrect password.')
        }

        return user
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: '/', // Redirect to homepage or login UI
  },

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      // Attach user info to token on login
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.provider = user.provider || 'credentials'
      }
      return token
    },
    async session({ session, token }) {
      // Attach token info to session object
      session.user.id = token.id
      session.user.provider = token.provider
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET, // Required in production
})

export { handler as GET, handler as POST }
