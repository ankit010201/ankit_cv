import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ankitagrawal.com"),
  title: "Ankit Agrawal",
  description: "Ankit’s PersonalOS — engineering, music, films, videos and running.",
  openGraph: {
    title: "Ankit Agrawal",
    description: "Ankit’s PersonalOS — engineering, music, films, videos and running.",
    images: [
      {
        url: "/ankit-cv.png",
        width: 800,
        height: 600,
        alt: "Ankit CV",
        type: "image/png",
      },
    ],
  },
};
