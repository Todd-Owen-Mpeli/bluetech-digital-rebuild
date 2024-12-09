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
				black: "#212020",
				grey: "#cecece",
				white: "#ffffff",
				pureBlack: "#000",
				darkGrey: "#8f8f8f",
				lightGrey: "#f7f7f7",
				lightBlack: "#292929",
				lightGreyTwo: "#fafafa",

				primary: {
					default: "#8094ee",
					two: "#8094ee",
					light: "#8094ee",
					dark: "#8094ee",
					darker: "#8094ee",
				},
				accent: {
					default: "#c0a6f8",
					two: "#7736f1",
					dark: "#622bc7",
					darker: "#521cb7",
				},
				tertiary: {
					default: "#ffbd59",
					two: "#ffbd59",
					light: "#ffbd59",
					dark: "#ffbd59",
					darker: "#ffbd59",
				},
				quaternary: {
					default: "#e5dfd0",
					two: "#e5dfd0",
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
