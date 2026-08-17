import Image from "next/image";
import { Github, Linkedin, Mail } from "@/components/social/social-icons/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import siteMetadata from "@/data/siteMetadata.mjs";

const SocialTooltip = ({ label }: { label: string }) => (
	<span
		role="tooltip"
		className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 translate-y-1 scale-90 whitespace-nowrap rounded-md bg-[#DBE8A8] px-3 py-1.5 text-xs font-medium text-[#042C0E] opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 group-focus-visible:opacity-100"
	>
		{label}
		<span className="absolute left-1/2 top-full -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#DBE8A8]" />
	</span>
);

const Hero = ({ heroFontStyles }) => {
	return (
		<div className="relative min-h-[380px] overflow-hidden rounded-md bg-[color:var(--hero-background)] p-6 md:min-h-[500px] md:p-10 lg:min-h-0">
			<h1
				className={`${heroFontStyles} fade-in-down-headline text-5xl font-bold uppercase tracking-tighter text-[#DBE8A8]
           opacity-0 md:text-[114px] lg:leading-[114px] xl:text-[168px] xl:leading-[168px]`}
			>
				John Decorte
			</h1>
			<div className="flex">
				<p
					className={`fade-in-down pr-20 pt-10 text-[#DBE8A8] opacity-0 md:max-w-[300px] md:pt-24 xl:whitespace-pre`}
				>
					{`Fullstack & Security Engineer \ncrafting resilient, real-time \nsystems — from startups \nto scale. Bug bounty hunter \n& CTF enthusiast.`}
				</p>
				<Image
					src="/static/images/jdecorte_fullbody.avif"
					alt="John Decorte"
					width={864}
					height={1184}
					sizes="(max-width: 768px) 160px, 305px"
					placeholder="blur"
					className={`image-animate-on-load absolute -bottom-10 right-0 h-auto w-[160px] opacity-0 drop-shadow-2xl md:right-48 md:top-24 md:w-[305px] xl:left-60`}
					priority
					blurDataURL="data:image/webp;base64,UklGRq4AAABXRUJQVlA4WAoAAAAQAAAABwAACgAAQUxQSFIAAAANcFrbtuKcYXQ8oyAKK0gxkWkifvpJHcwMmh1TGxERQFJbtv/g5MY2f4AesxeA8MIYcBpQXH2kJlC/tvwqYBcG4RvAPzh3gPB8k1VA+C/kAnABVlA4IDYAAACQAQCdASoIAAsAA4BaJQAAS0t1JwAA/vDhGkK0hbk51VqofGbblt/5LiS0AMeQ6XSF5FjnwAA="
				/>
			</div>
			<div className="absolute bottom-4 left-4 md:bottom-6 md:left-auto md:right-6">
				<div className="flex h-12 items-center -space-x-3">
					<a
						href={`mailto:${siteMetadata.email}`}
						className="group relative z-[3] block transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:scale-110 focus-visible:-translate-y-1.5 focus-visible:scale-110"
					>
						<SocialTooltip label="Email" />
						<Avatar className="border-2 border-[#DBE8A8] bg-[#DBE8A8]">
							<AvatarFallback className="bg-[#042C0E]">
								<Mail className="h-6 w-6 fill-[#DBE8A8]" />
							</AvatarFallback>
						</Avatar>
					</a>
					<a
						href={siteMetadata.github}
						target="_blank"
						rel="noopener noreferrer"
						className="group relative z-[2] block transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:scale-110 focus-visible:-translate-y-1.5 focus-visible:scale-110"
					>
						<SocialTooltip label="GitHub" />
						<Avatar className="border-2 border-[#DBE8A8] bg-[#DBE8A8]">
							<AvatarFallback className="bg-[#042C0E]">
								<Github className="h-6 w-6 fill-[#DBE8A8]" />
							</AvatarFallback>
						</Avatar>
					</a>
					<a
						href={siteMetadata.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="group relative z-[1] block transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:scale-110 focus-visible:-translate-y-1.5 focus-visible:scale-110"
					>
						<SocialTooltip label="LinkedIn" />
						<Avatar className="border-2 border-[#DBE8A8] bg-[#DBE8A8]">
							<AvatarFallback className="bg-[#042C0E]">
								<Linkedin className="h-6 w-6 fill-[#DBE8A8]" />
							</AvatarFallback>
						</Avatar>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Hero;
