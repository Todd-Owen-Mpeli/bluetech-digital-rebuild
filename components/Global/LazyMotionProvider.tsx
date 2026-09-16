"use client";

import { FC, ReactNode } from "react";
import { LazyMotion } from "framer-motion";

const loadFeatures = () => import("@/components/Global/lazyMotionFeatures").then((mod) => mod.default);

/**
 * Wraps the whole app so every `<m.*>` element loads only the specific
 * `domAnimation` feature bundle it needs, instead of importing `motion` from
 * "framer-motion" directly (which bundles the library's entire feature set —
 * drag, full layout animations, gestures, exit animations — regardless of
 * which of those this app actually uses).
 *
 * `strict` throws at runtime if any descendant renders `motion.*` instead of
 * `m.*` — kept on permanently as a regression tripwire, since a single miss
 * would otherwise silently re-bundle the whole library.
 */
const LazyMotionProvider: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<LazyMotion features={loadFeatures} strict>
			{children}
		</LazyMotion>
	);
};

export default LazyMotionProvider;
