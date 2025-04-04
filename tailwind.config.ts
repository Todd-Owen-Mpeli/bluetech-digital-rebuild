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
				black: "#020202",
				grey: "#cecece",
				white: "#ffffff",
				pureBlack: "#000",
				darkGrey: "#8f8f8f",
				lightGrey: "#f7f7f7",
				lightBlack: "#292929",
				lightGreyTwo: "#fafafa",

				primary: {
					default: "#012b27",
					two: "#023b36",
					dark: "#011412",
					darker: "#011412",
				},
				accent: {
					default: "#bff007",
					two: "#ffb000",
					dark: "#ffb000",
					darker: "#ffb000",
				},
				secondary: {
					default: "#dee7df",
					two: "#8531ed",
				},
				tertiary: {
					default: "#2044d5",
					two: "#67aaf9",
					dark: "#8531ed",
					darker: "#8531ed",
				},
			},
		},
	},
	plugins: [
		function ({addUtilities}: PluginAPI) {
			addUtilities({
				".font-primary": {
					fontFamily: '"primary"',
				},
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
				".font-secondaryBlack": {
					fontFamily: '"secondaryBlack"',
				},
				".font-secondaryLight": {
					fontFamily: '"secondaryLight"',
				},
				".font-secondaryMedium": {
					fontFamily: '"secondaryMedium"',
				},
				".font-secondaryRegular": {
					fontFamily: '"secondaryRegular"',
				},
			} as CSSRuleObject);
		},
	],
} satisfies Config;
