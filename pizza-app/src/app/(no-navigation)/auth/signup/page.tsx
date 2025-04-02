import { Metadata } from "next";
import SignUp from "./signup";

export const metadata: Metadata = {
  title: "Sign Up | Your App Name",
  description:
    "Sign up for a new account to access exclusive features and manage your profile.",
  openGraph: {
    title: "Sign Up | Your App Name",
    description: "Create a new account and enjoy exclusive features.",
    images: [
      {
        url: "/images/signin-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sign Up to Your App Name",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up | Your App Name",
    description: "Create a new account for a personalized experience.", 
    images: ["/images/signin-twitter-image.jpg"],
  },
};

export default function SignInPage() {
  return <SignUp />;
}
