// Imports
import { ILinks } from "@/types/context";
import { fetchCmsGraphQL } from "@/graphql/CMS/fetchCmsGraphQL";

// Navbar Menu Links
export const getNavbarMenuLinks =
	async (): Promise<ILinks.INavbarMenuLinks> => {
		try {
			const content = `
				{
					navbarMenuLinks: menuItems(where: {location: PRIMARY}) {
						edges {
							node {
								id
								url
								label
							}
						}
					}
				}
			`;

			const data: any = await fetchCmsGraphQL(content);

			return data?.navbarMenuLinks?.edges;
		} catch (error) {
			console.log(error);
			throw new Error(
				"Something went wrong trying to fetch main menu links content"
			);
		}
	};

// Mobile Navbar links
export const getMobileLinks = async (): Promise<ILinks.IMobileLinks> => {
	try {
		const content = `
			{
				mobileLinks: menuItems(where: {location: MOBILE_LINKS}, first: 10) {
					edges {
						node {
							id
							url
							label
						}
					}
				}
			}
		`;

		const data: any = await fetchCmsGraphQL(content);

		return data?.mobileLinks?.edges;
	} catch (error) {
		console.log(error);
		throw new Error(
			"Something went wrong trying to fetch mobile links content"
		);
	}
};

// Navbar Our Services Sublinks
export const getOurServicesSublinks =
	async (): Promise<ILinks.IOurServicesLinks> => {
		try {
			const content = `
				{
					ourServicesSublinks: menuItems(
						where: {location: OUR_SERVICES}
						first: 10
					) {
						edges {
							node {
								id
								url
								label
							}
						}
					}
				}
			`;

			const data: any = await fetchCmsGraphQL(content);

			return data?.ourServicesSublinks?.edges;
		} catch (error) {
			console.log(error);
			throw new Error(
				"Something went wrong trying to fetch our services sublinks content"
			);
		}
	};

// Footer Copyright Links
export const getCopyrightLinks = async (): Promise<ILinks.ICopyrightLinks> => {
	try {
		const content = `
			{
				copyrightLinks: menuItems(
					where: {location: COPYRIGHT_LINKS}
					first: 10
				) {
					edges {
						node {
							id
							url
							label
						}
					}
				}
			}
		`;

		const data: any = await fetchCmsGraphQL(content);

		return data?.copyrightLinks?.edges;
	} catch (error) {
		console.log(error);
		throw new Error(
			"Something went wrong trying to fetch copyright links content"
		);
	}
};

// Footer Menu Links
export const getFooterMenuLinks =
	async (): Promise<ILinks.IFooterMenuLinks> => {
		try {
			const content = `
				{
					footerMenuLinks: menuItems(where: {location: FOOTER}) {
						edges {
							node {
								id
								url
								label
							}
						}
					}
				}
			`;

			const data: any = await fetchCmsGraphQL(content);

			return data?.footerMenuLinks?.edges;
		} catch (error) {
			console.log(error);
			throw new Error(
				"Something went wrong trying to fetch footer menu links content"
			);
		}
	};
