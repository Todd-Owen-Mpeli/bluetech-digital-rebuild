// Imports
import {render} from "@react-email/components";
import {emailTransporter} from "@/config/nodemailer";
import {NextRequest, NextResponse} from "next/server"; // Change here

// Types
import {IBusinessEmail, ICustomerEmail} from "@/types/email";
import {getThemesOptionsContent} from "@/graphql/GetAllThemesOptions";

// Components
import CustomerEnquiryConfirmationEmail from "@/components/Emails/CustomerEnquiryConfirmationEmail";
import BusinessCustomerEnquiryConfirmationEmail from "@/components/Emails/BusinessCustomerEnquiryConfirmationEmail";

// Handler for the POST request
export async function POST(req: NextRequest) {
	const data = await req.json(); // Use the json() method for reading the body

	// If any of these values are undefined
	if (
		!data?.email ||
		!data?.message ||
		!data?.subject ||
		!data?.lastName ||
		!data?.firstName ||
		!data?.phoneNumber ||
		!data?.selectedServices
	) {
		console.log("Missing Data Fields. Please try again.");
		return NextResponse.json({error: "Missing required fields"}, {status: 400});
	}

	try {
		const imagesDirUrl: any = process.env.IMAGE_DIR_URL;
		const themesOptionsContent: any = await getThemesOptionsContent();

		/* Render React Customer Enquiry Confirmation Email Component */
		const customerEmailHtml: any = render(
			<CustomerEnquiryConfirmationEmail
				email={data?.email}
				imagesDirUrl={imagesDirUrl}
				subject={data?.subject}
				lastName={data?.lastName}
				phoneNumber={data?.phoneNumber}
				firstName={data?.firstName}
				themesOptionsContent={themesOptionsContent}
				selectedServices={data?.selectedServices}
			/>
		);

		/* Render React Business Customer Enquiry Confirmation Email Component */
		const businessEmailHtml: any = render(
			<BusinessCustomerEnquiryConfirmationEmail
				email={data?.email}
				imagesDirUrl={imagesDirUrl}
				subject={data?.subject}
				message={data?.message}
				lastName={data?.lastName}
				phoneNumber={data?.phoneNumber}
				firstName={data?.firstName}
				themesOptionsContent={themesOptionsContent}
				selectedServices={data?.selectedServices}
			/>
		);

		/* Customer Enquiry Confirmation Email */
		const customerEmail: ICustomerEmail = {
			from: themesOptionsContent?.email,
			to: data?.email,
			subject: `Thank You for Contacting Bluetech Digital Ltd`,
			html: customerEmailHtml,
		};

		/* Business Customer Enquiry Confirmation Email */
		const businessEmail: IBusinessEmail = {
			from: themesOptionsContent?.email,
			to: themesOptionsContent?.email,
			subject: `New Website Inquiry: ${data?.subject}`,
			html: businessEmailHtml,
		};

		await emailTransporter.sendMail({...customerEmail});
		await emailTransporter.sendMail({...businessEmail});

		return NextResponse.json({success: true}, {status: 200});
	} catch (err) {
		console.log(err);
		return NextResponse.json({error: "Server error"}, {status: 500});
	}
}
