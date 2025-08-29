"use client";

// Imports
import React, { FC, useMemo, Fragment} from "react";
import { usePageContext } from "@/context/providers/PageContextProvider";

// Components
import Hero from "@/components/CMS/Hero/Hero";
import CTATwo from "@/components/CMS/CTATwo/CTATwo";
import OurServices from "@/components/CMS/OurServices/OurServices";
import RightPartner from "@/components/CMS/RightPartner/RightPartner";
import PartnersLogos from "@/components/CMS/PartnersLogos/PartnersLogos";
import TitleParagraph from "@/components/CMS/TitleParagraph/TitleParagraph";

const RenderFlexibleContent: FC = () => {
	const { memoizedValues } = usePageContext();
	
	// Destructure for clarity
	const content = memoizedValues.content;
	const postTypeFlexibleContent = memoizedValues.postTypeFlexibleContent;
	
	// Memoize the Components Key Value Pairs
	const componentMapping = useMemo(() => {
        const mapping: { [key: string]: React.ComponentType<any> } = {
			[`${postTypeFlexibleContent}_Hero`]: Hero,
			[`${postTypeFlexibleContent}_CTATwo`]: CTATwo,
			[`${postTypeFlexibleContent}_OurServices`]: OurServices,
			[`${postTypeFlexibleContent}_RightPartner`]: RightPartner,
			[`${postTypeFlexibleContent}_PartnersLogos`]: PartnersLogos,
			[`${postTypeFlexibleContent}_TitleParagraph`]: TitleParagraph,
        };
        return mapping;
    }, [postTypeFlexibleContent]); // Recreate mapping only if postTypeFlexibleContent changes

	return (
		<>
			{content.map((item: any, index: number) => (
				<Fragment key={item.fieldGroupName || index}>
					{item.displaySection === true ? (
						<section>
							{componentMapping[item.fieldGroupName] && (
								<>
									{React.createElement(componentMapping[item.fieldGroupName], {
										...item,
									})}
								</>
							)}
						</section>
					) : (null )}
				</Fragment>
			))}
        </>
	);
};

export default RenderFlexibleContent;
