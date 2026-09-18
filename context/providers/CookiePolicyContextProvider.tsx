"use client";

// Imports
import { FC, useEffect, useState } from "react";
import {ICookiePolicy} from "@/context/types/context";
import { CookiePolicyContext } from "@/context/cookies";

const CookiePolicyContextProvider: FC<ICookiePolicy.IContextProvider> = ({
	children,
}) => {
	const [hasConsent, setHasConsent] = useState<boolean | null>(null); // null, true, or false

	useEffect(() => {
		// document.cookie can't be read during SSR render; this one-time sync on
		// mount is the legitimate effect use case, not a derivable render value.
		const cookiesAccepted = document.cookie.includes("cookie-consent=accepted");
		const cookiesRefused = document.cookie.includes("cookie-consent=refused");

		if (cookiesAccepted) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setHasConsent(true);
		} else if (cookiesRefused) {
			setHasConsent(false);
		} else {
			setHasConsent(null); // No decision has been made yet
		}
	}, []);

	// Accept Cookies Duration is One Month (2,592,000 seconds)
	const acceptCookies = () => {
		document.cookie = "cookie-consent=accepted; max-age=2592000; path=/";
		setHasConsent(true);
	};

	// Refuse Cookies Duration is One Month (2,592,000 seconds)
	const refuseCookies = () => {
		document.cookie = "cookie-consent=refused; max-age=2592000; path=/";
		setHasConsent(false);
	};

	const value = {
		hasConsent,
		acceptCookies,
		refuseCookies
	};

  return (
    <CookiePolicyContext.Provider value={value}>
      {children}
    </CookiePolicyContext.Provider>
  );
};

CookiePolicyContextProvider.displayName = 'CookiePolicyContextProvider';

export default CookiePolicyContextProvider;
