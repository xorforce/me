import localFont from "next/font/local"

const intelOneMono = localFont({
  src: [
    {
      path: "../public/fonts/Intel_One_Mono/IntelOneMono-VariableFont_wght.ttf",
      weight: "400 700",
      style: "normal",
    },
    {
      path: "../public/fonts/Intel_One_Mono/IntelOneMono-Italic-VariableFont_wght.ttf",
      weight: "400 700",
      style: "italic",
    },
  ],
  variable: "--font-intel-one-mono",
  display: "swap",
})

export const fonts = {
  intelOneMono,
}

export const fontVariables = [fonts.intelOneMono.variable].join(" ")
