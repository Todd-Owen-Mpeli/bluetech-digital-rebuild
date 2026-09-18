// Imports
import { FC } from "react";
import { IInstagramFeed } from "@/components/CMS/InstagramFeed/types/instagramFeed";

/**
 * Structure-only placeholder, registered in
 * `components/FlexibleContent/RenderFlexibleContent.tsx`'s loader map under
 * `${postTypeFlexibleContent}_InstagramFeed` (the confirmed real ACF field
 * group name), so a page using this block never silently drops its content.
 *
 * Renders nothing yet — the real field shape isn't known (WPGraphQL
 * introspection is disabled on both CMS hosts, so the schema-driven prop
 * typing this would normally come from wasn't possible this session). Build
 * this out for real using cbf-rebuild's `SocialMediaGrid` as the reference
 * implementation (Instagram Graph API integration, self-refreshing access
 * token via Vercel Edge Config + a weekly Vercel Cron, pagination, mobile
 * hover-stats) once the real ACF fields are confirmed.
 */
const InstagramFeed: FC<IInstagramFeed.IProps> = () => {
	return null;
};

export default InstagramFeed;
