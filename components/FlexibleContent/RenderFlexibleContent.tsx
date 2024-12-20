"use client";

// Imports
import React, {FC, Fragment} from "react";
import {usePageContext} from "@/context/providers/PageContextProvider";

// Components
import Hero from "@/components/Hero/Index";
import Samurai from "@/components/Samurai/Index";
import TitleParagraph from "@/components/TitleParagraph/Index";

const RenderFlexibleContent: FC = () => {
	const content = usePageContext();
	const FlexibleContent: any = content?.postTypeFlexibleContent;

	// Components Key Value Pairs
	const componentMap: any = {
		[`${FlexibleContent}_Hero`]: Hero,
		[`${FlexibleContent}_TitleParagraph`]: TitleParagraph,
		[`${FlexibleContent}_Samurai`]: Samurai,
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
				))}
		</>
	);
};

export default RenderFlexibleContent;
