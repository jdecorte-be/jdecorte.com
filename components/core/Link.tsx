/* eslint-disable jsx-a11y/anchor-has-content */

import type { LinkProps } from "next/link";
import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

type UmamiAnchorProps = Omit<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	"href"
> & {
	"data-umami-event"?: string;
};

const CustomLink = ({ href, ...rest }: LinkProps & UmamiAnchorProps) => {
	const hrefValue =
		typeof href === "string"
			? href
			: typeof href?.pathname === "string"
				? href.pathname
				: "";
	const isInternalLink = hrefValue.startsWith("/");
	const isAnchorLink = hrefValue.startsWith("#");
	// Internal navigation is already captured as a pageview, so only tag it
	// as a custom event when the caller explicitly opts in (e.g. a project
	// card click we want to track as a goal). Outbound links default to an
	// auto-generated event since they leave the site untracked otherwise.
	const explicitEvent = rest["data-umami-event"];

	if (isInternalLink || isAnchorLink) {
		const linkProps = explicitEvent
			? { ...rest, "data-umami-event": explicitEvent }
			: rest;

		if (isAnchorLink) {
			return (
				<a href={hrefValue} {...linkProps}>
					{rest.children}
				</a>
			);
		}

		return <Link href={href} {...linkProps} />;
	}

	return (
		<a
			target="_blank"
			rel="noopener noreferrer"
			href={hrefValue}
			{...rest}
			data-umami-event={explicitEvent ?? `Clicked link ${hrefValue}`}
		>
			{rest.children}
		</a>
	);
};

export default CustomLink;
