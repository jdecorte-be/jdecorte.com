/* eslint-disable jsx-a11y/anchor-has-content */

import type { LinkProps } from "next/link";
import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

type UmamiAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
	"data-umami-event"?: string;
};

const CustomLink = ({
	href,
	...rest
}: LinkProps & UmamiAnchorProps) => {
	const hrefValue = typeof href === "string" ? href : href?.pathname ?? "";
	const isInternalLink = hrefValue.startsWith("/");
	const isAnchorLink = hrefValue.startsWith("#");
	const umamiEvent =
		rest["data-umami-event"] ??
		(hrefValue ? `Clicked link ${hrefValue}` : "Clicked link");

	if (isInternalLink) {
		return <Link href={href} {...rest} data-umami-event={umamiEvent} />;
	}

	if (isAnchorLink) {
		return (
			<a href={href} {...rest} data-umami-event={umamiEvent}>
				{rest.children}
			</a>
		);
	}

	return (
		<a
			target="_blank"
			rel="noopener noreferrer"
			href={href}
			{...rest}
			data-umami-event={umamiEvent}
		>
			{rest.children}
		</a>
	);
};

export default CustomLink;
