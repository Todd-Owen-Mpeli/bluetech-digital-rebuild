/**
 * Placeholder props only — the real ACF field shape for this block isn't
 * known yet (WPGraphQL introspection is disabled on both CMS hosts, so the
 * schema-vs-components diff this would normally come from wasn't possible —
 * see the upgrade-plan audit). `title` is a safe minimum guess shared by
 * every other simple block in this codebase; fill in the real shape (feed
 * source, post count, etc.) once introspection is available or the fields
 * are confirmed another way.
 */
export namespace IInstagramFeed {
	export type IProps = {
		title?: string;
	};
}
