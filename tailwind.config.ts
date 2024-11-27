import type {Config} from "tailwindcss";
import {PluginAPI, CSSRuleObject} from "tailwindcss/types/config";

export default {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./styles/**/*.{css,scss}",
	],
	theme: {
		extend: {
			screens: {
				xs: "320px",
				sm: "425px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
			},
			fontSize: {
				xs: ".75rem",
				sm: ".8rem",
				tiny: ".9rem",
				base: "1rem",
				medium: "1.15rem",
				paragraph: "1.05rem",
				lg: "1.25rem",
				xl: "1.5rem",
				"2xl": "1.75rem",
				"3xl": "1.85rem",
				"4xl": "2rem",
				"5xl": "2.25rem",
				"6xl": "2.5rem",
				"7xl": "3rem",
				"8xl": "4rem",
				"9xl": "4rem",
				"10xl": "4.5rem",
				"11xl": "5rem",
				"12xl": "5.5rem",
			},
			colors: {
				black: "#111",
				grey: "#cecece",
				white: "#ffffff",
				pureBlack: "#000",
				darkGrey: "#8f8f8f",
				lightGrey: "#f7f7f7",
				lightBlack: "#292929",
				lightGreyTwo: "#fafafa",

				primary: {
					default: "#1161ff",
					two: "#3978ff",
					light: "#3d77f3",
					dark: "#001b66",
					darker: "#00072D",
				},
				accent: {
					default: "#833df4",
					two: "#7736f1",
					dark: "#622bc7",
					darker: "#521cb7",
				},
				tertiary: {
					default: "#ffb000",
					two: "#fb8c00",
					light: "#ffca10",
					dark: "#d1a855",
					darker: "#bc7700",
				},
				quaternary: {
					default: "#e20031",
					two: "#9a0021",
				},
			},
			fontFamily: {
				StretchPro: ["StretchPro"],
				T1KoriumVF: ["T1KoriumVF"],
				T1Korium2KG: ["T1Korium2KG"],
				GanhTypeThin: ["GanhTypeThin"],
				GanhTypeRegular: ["GanhTypeRegular"],
				BGAPBold: ["BGAPBold"],
				BGAPBlack: ["BGAPBlack"],
				BGAPLight: ["BGAPLight"],
				BGAPMedium: ["BGAPMedium"],
				BGAPRegular: ["BGAPRegular"],
			},
		},
	},
	plugins: [
		function ({addUtilities}: PluginAPI) {
			addUtilities({
				".font-StretchPro": {
					fontFamily: '"StretchPro"',
				},
				".font-T1KoriumVF": {
					fontFamily: '"T1KoriumVF"',
				},
				".font-T1Korium2KG": {
					fontFamily: '"T1Korium2KG"',
				},
				".font-GanhTypeThin": {
					fontFamily: '"GanhTypeThin"',
				},
				".font-GanhTypeRegular": {
					fontFamily: '"GanhTypeRegular"',
				},
				".font-BGAPBold": {
					fontFamily: '"BGAPBold"',
				},
				".font-BGAPBlack": {
					fontFamily: '"BGAPBlack"',
				},
				".font-BGAPLight": {
					fontFamily: '"BGAPLight"',
				},
				".font-BGAPMedium": {
					fontFamily: '"BGAPMedium"',
				},
				".font-BGAPRegular": {
					fontFamily: '"BGAPRegular"',
				},
			} as CSSRuleObject);
		},
	],
} satisfies Config;
