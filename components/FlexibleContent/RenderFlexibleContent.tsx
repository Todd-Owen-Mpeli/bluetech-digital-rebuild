"use client";

// Imports
import React, {FC, Fragment} from "react";
import {usePageContext} from "@/context/providers/PageContextProvider";

// Components
import TitleParagraph from "@/components/TitleParagraph/Index";

const RenderFlexibleContent: FC = () => {
	const content = usePageContext();
	const FlexibleContent: any = content?.postTypeFlexibleContent;

	// Components Key Value Pairs
	const componentMap: any = {
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
				))}
		</>
	);
};

export default RenderFlexibleContent;
