import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import Hero from "@/components/CMS/Hero/Hero";
import CTATwo from "@/components/CMS/CTATwo/CTATwo";
import OurServices from "@/components/CMS/OurServices/OurServices";
import RightPartner from "@/components/CMS/RightPartner/RightPartner";
import PartnersLogos from "@/components/CMS/PartnersLogos/PartnersLogos";
import TitleParagraph from "@/components/CMS/TitleParagraph/TitleParagraph";
import InstagramFeed from "@/components/CMS/InstagramFeed/InstagramFeed";

/* -----------------------------------------------------------------------------
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX What this test is for XXXXXXXXXXXXXXXXXXXXXXXXXXX
Regression coverage for every registered CMS block at once: given a plausible
set of CMS props (matching each block's own types/<name>.ts shape), the
component renders without throwing and puts *something* in the DOM. Every
block here is registered in RenderFlexibleContent.tsx's componentMapping,
including InstagramFeed — a structure-only placeholder (see its own doc
comment) that's asserted to render nothing rather than crash, since its real
ACF field shape isn't known yet.

As a block's markup grows more complex, give it its own dedicated *.test.tsx
with real prop-behaviour assertions instead of relying on this file alone.
----------------------------------------------------------------------------- */

const image = {
	altText: "alt text",
	sourceUrl: "/api/media/2025/01/image.jpg",
	mediaDetails: { width: 800, height: 600 },
};

const link = { url: "/about", title: "About", target: "" };

const video = {
	title: "A video",
	mimeType: "video/mp4",
	mediaItemUrl: "/api/media/2025/01/video.mp4",
	mediaDetails: { width: 1920, height: 1080 },
};

describe("CMS block registry", () => {
	it("Hero: renders without crashing given base CMS props", () => {
		const { container } = render(
			<Hero
				heroViewOne={{
					title: "Slide one",
					subtitle: "Subtitle",
					displayVideo: true,
					video,
					videoBackgroundImage: image,
				}}
				heroViewTwo={{
					paragraph: "Paragraph",
					paragraphTwo: "Paragraph two",
					displayVideo: true,
					video,
					buttonLink: link,
					videoBackgroundImage: image,
				}}
				heroViewThree={{
					title: "Slide three",
					displayVideo: true,
					link,
					video,
					backgroundImage: image,
				}}
			/>,
		);
		expect(container.firstChild).toBeTruthy();
	});

	it("CTATwo: renders without crashing given base CMS props", () => {
		const { container } = render(<CTATwo title="A call to action" buttonLink={link} />);
		expect(container.firstChild).toBeTruthy();
	});

	it("OurServices: renders without crashing given base CMS props", () => {
		const { container } = render(
			<OurServices
				title="Our services"
				service={[
					{
						title: "Service one",
						paragraph: "Description",
						backgroundColour: "#000000",
						options: [{ text: "Option one" }],
						buttonLink: link,
						image,
					},
				]}
				hoverImages={[{ image }]}
				backgroundImage={image}
				servicesBackgroundImage={image}
			/>,
		);
		expect(container.firstChild).toBeTruthy();
	});

	it("PartnersLogos: renders without crashing given base CMS props", () => {
		const { container } = render(<PartnersLogos logoGrid={[{ image }]} />);
		expect(container.firstChild).toBeTruthy();
	});

	it("RightPartner: renders without crashing given base CMS props", () => {
		const { container } = render(
			<RightPartner
				title="Right partner"
				paragraph="Description"
				stats={[{ text: "Stat", number: "100", paragraph: "Detail" }]}
				image={image}
				hoverImage={image}
				backgroundImage={image}
			/>,
		);
		expect(container.firstChild).toBeTruthy();
	});

	it("TitleParagraph: renders without crashing given base CMS props", () => {
		const { container } = render(
			<TitleParagraph title="A title" paragraph="A paragraph" displayParagraph={true} />,
		);
		expect(container.firstChild).toBeTruthy();
	});

	it("InstagramFeed: structure-only placeholder renders nothing rather than crashing", () => {
		const { container } = render(<InstagramFeed title="Follow us" />);
		expect(container.firstChild).toBeNull();
	});
});
