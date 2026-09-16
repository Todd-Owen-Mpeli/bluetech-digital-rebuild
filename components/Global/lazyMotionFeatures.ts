// Must stay its own file, never statically imported elsewhere, or the
// bundler ships the feature bundle eagerly regardless of LazyMotionProvider's
// dynamic import.
export { domAnimation as default } from "framer-motion";
// domAnimation covers viewport animations (whileInView), gestures, and
// AnimatePresence/exit animations — everything this codebase's `m.*` usage
// needs. domMax (drag + full layout animations) isn't needed: confirmed by
// grepping the whole app for `drag` / `layout=` / `layoutId=` — none found.
