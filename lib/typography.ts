import localFont from "next/font/local"

const ibmPlexMono = localFont({
  src: [
    {
      path: "../public/fonts/IBM_Plex_Mono/IBMPlexMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/IBM_Plex_Mono/IBMPlexMono-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/IBM_Plex_Mono/IBMPlexMono-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/IBM_Plex_Mono/IBMPlexMono-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/IBM_Plex_Mono/IBMPlexMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/IBM_Plex_Mono/IBMPlexMono-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-ibm-plex-mono",
  display: "swap",
})

export const fonts = {
  ibmPlexMono,
}

export const fontVariables = [fonts.ibmPlexMono.variable].join(" ")
