"use client";

// Imports
import React, {FC, Fragment} from "react";
import {usePageContext} from "@/context/providers/PageContextProvider";

// Components
import Hero from "@/components/Hero/Hero";
import OurServices from "@/components/OurServices/OurServices";
import RightPartner from "@/components/RightPartner/RightPartner";
import TitleParagraph from "@/components/TitleParagraph/TitleParagraph";

const RenderFlexibleContent: FC = () => {
	const content = usePageContext();
	const FlexibleContent: any = content?.postTypeFlexibleContent;

	// Components Key Value Pairs
	const componentMap: any = {
		[`${FlexibleContent}_Hero`]: Hero,
		[`${FlexibleContent}_OurServices`]: OurServices,
		[`${FlexibleContent}_RightPartner`]: RightPartner,
		[`${FlexibleContent}_TitleParagraph`]: TitleParagraph,
	};

	return (
		<>
			{content?.content?.length > 0 &&
				content?.content?.map((item: any, index: number) => (
					<Fragment key={index}>
						{item?.displaySection ? (
							<section>
								{componentMap[item?.fieldGroupName] && (
									<>
										{React.createElement(componentMap[item?.fieldGroupName], {
											...item,
										})}
									</>
								)}
							</section>
						) : (
							<></>
						)}
					</Fragment>
				))
			}
		</>
	);
};

export default RenderFlexibleContent;
