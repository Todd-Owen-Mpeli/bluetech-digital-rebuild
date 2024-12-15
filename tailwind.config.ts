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
					default: "#041B15",
					two: "#041B15",
					dark: "#041B15",
					darker: "#041B15",
				},
				accent: {
					default: "#ffb000",
					two: "#ffb000",
					dark: "#ffb000",
					darker: "#ffb000",
				},
				tertiary: {
					default: "#fffbf2",
					two: "#fffbf2",
					dark: "#fffbf2",
					darker: "#fffbf2",
				},
				quaternary: {
					default: "#ECE5D5",
					two: "#ECE5D5",
				},
			},
		},
	},
	plugins: [
		function ({addUtilities}: PluginAPI) {
			addUtilities({
				".font-MTVBlack": {
					fontFamily: '"MTVBlack"',
				},
				".font-MTVLight": {
					fontFamily: '"MTVLight"',
				},
				".font-MTVRegular": {
					fontFamily: '"MTVRegular"',
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
