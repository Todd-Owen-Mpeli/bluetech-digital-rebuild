"use client";

// Imports
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { locales, localeLabels } from "@/context/constants";

// Styling
import styles from "@/components/Global/LocaleSwitcher/styles/LocaleSwitcher.module.css";

type ILocaleSwitcher = {
	/** The current route's locale — read from global context in the Navbar (a
	 * client component) and passed down, since this is nested and shouldn't
	 * reach back into context itself. */
	currentLocale: string;
	/** Optional extra class on the root (e.g. the mobile menu variant). */
	className?: string;
};

const NEXT_LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/**
 * Language dropdown in the Navbar. The trigger shows only the current
 * locale's label; opening it lists every supported locale, each a link to
 * the *current* page re-based under that locale (`pathname` always starts
 * with `/{currentLocale}`, so swapping just that leading segment preserves
 * the page the visitor is on).
 *
 * Clicking a locale also sets the `NEXT_LOCALE` cookie (read by `proxy.ts`)
 * so the choice sticks on a later visit to a bare, un-prefixed URL.
 */
const LocaleSwitcher: FC<ILocaleSwitcher> = ({ currentLocale, className }) => {
	const pathname = usePathname();
	const pathWithoutLocale = pathname.replace(new RegExp(`^/${currentLocale}(?=/|$)`), "") || "/";

	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	// Close on outside click / Escape.
	useEffect(() => {
		if (!open) return;

		const onPointerDown = (event: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};

		document.addEventListener("mousedown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("mousedown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);

	const chooseLocale = (locale: string) => {
		// Persist the explicit choice for `proxy.ts` to read on a later visit to a
		// bare URL. `document.cookie` assignment is an append-a-cookie operation,
		// not a reassignment — the immutability lint rule can't tell the difference.
		// eslint-disable-next-line react-hooks/immutability
		document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${NEXT_LOCALE_COOKIE_MAX_AGE}`;
		setOpen(false);
	};

	return (
		<div ref={rootRef} className={`${styles.localeSwitcher}${className ? ` ${className}` : ""}`}>
			<button
				type="button"
				onClick={() => setOpen((value) => !value)}
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-label={`Change language — current: ${localeLabels[currentLocale] ?? currentLocale}`}
				className={styles.localeSwitcherTrigger}
			>
				{currentLocale.toUpperCase()}
			</button>

			<AnimatePresence>
				{open ? (
					<m.ul
						initial={{ opacity: 0, y: -6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -6 }}
						transition={{ duration: 0.15, ease: "easeOut" }}
						role="listbox"
						className={styles.localeSwitcherMenu}
					>
						{locales.map((locale) => (
							<li key={locale} role="option" aria-selected={locale === currentLocale}>
								<Link
									prefetch={false}
									href={`/${locale}${pathWithoutLocale}`}
									onClick={() => chooseLocale(locale)}
									aria-current={locale === currentLocale ? "true" : undefined}
									className={locale === currentLocale ? styles.localeSwitcherItemActive : styles.localeSwitcherItem}
								>
									{localeLabels[locale] ?? locale}
								</Link>
							</li>
						))}
					</m.ul>
				) : null}
			</AnimatePresence>
		</div>
	);
};

LocaleSwitcher.displayName = "LocaleSwitcher";

export default LocaleSwitcher;
