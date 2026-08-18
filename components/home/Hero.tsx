import Image from "next/image";
import { Github, Linkedin, Mail } from "@/components/social/social-icons/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import siteMetadata from "@/data/siteMetadata.mjs";

const SocialTooltip = ({ label }: { label: string }) => (
	<span
		role="tooltip"
		className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 translate-y-1 scale-90 whitespace-nowrap rounded-md bg-[#F2F0EA] px-3 py-1.5 text-xs font-medium text-[#141414] opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:scale-100 group-focus-visible:opacity-100"
	>
		{label}
		<span className="absolute left-1/2 top-full -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#F2F0EA]" />
	</span>
);

const Hero = ({ heroFontStyles }) => {
	return (
		<div className="relative min-h-[380px] overflow-hidden rounded-md bg-gradient-to-b from-[#1e1e22] to-[#0c0c0e] p-6 md:min-h-[500px] md:p-10 lg:min-h-0">
			<h1
				className={`${heroFontStyles} fade-in-down-headline text-5xl font-bold uppercase tracking-tighter text-[#F2F0EA]
           opacity-0 md:text-[114px] lg:leading-[114px] xl:text-[168px] xl:leading-[168px]`}
			>
				John Decorte
			</h1>
			<div className="flex">
				<p
					className={`fade-in-down pr-20 pt-10 text-[#F2F0EA]/65 opacity-0 md:max-w-[300px] md:pt-24 xl:whitespace-pre`}
				>
					{`Fullstack & Security Engineer \ncrafting resilient, real-time \nsystems — from startups \nto scale. Bug bounty hunter \n& CTF enthusiast.`}
				</p>
				<Image
					src="/static/images/jdecorte_fullbody-v2.avif"
					alt="John Decorte"
					width={1396}
					height={2267}
					sizes="(max-width: 768px) 140px, 270px"
					placeholder="blur"
					className={`image-animate-on-load absolute -bottom-10 right-0 h-auto w-[140px] opacity-0 drop-shadow-2xl md:right-48 md:top-40 md:w-[270px] xl:left-60`}
					priority
					blurDataURL="data:image/webp;base64,UklGRqQAAABXRUJQVlA4WAoAAAAQAAAABwAACwAAQUxQSFIAAAANgBoIAILocNcE2RmAHawyB3PYDDRvrGA7WCNRyfL+Q0REoDM03pGfEtvy/Io5onr3OJGYkine8nNfwrNRH74albavAMotoFH+X7rWwXMzCMENVlA4ICwAAACwAQCdASoIAAwABUB8JZQC7ADc4UgAAP7o0+++xC11zNiOk47LJhRMF0TAAA=="
				/>
			</div>
			<div className="absolute bottom-4 left-4 md:bottom-6 md:left-auto md:right-6">
				<div className="flex h-12 items-center -space-x-3">
					<a
						href={`mailto:${siteMetadata.email}`}
						className="group relative z-[3] block transition-transform duration-200 ease-out hover:-translate-y-1.5 hover:scale-110 focus-visible:-translate-y-1.5 focus-visible:scale-110"
					>
						<SocialTooltip label="Email" />
						<Avatar className="border-2 border-[#F2F0EA] bg-[#F2F0EA]">
							<AvatarFallback className="bg-[color:var(--background)]">
								<Mail className="h-6 w-6 fill-[#F2F0EA]" />
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
						<Avatar className="border-2 border-[#F2F0EA] bg-[#F2F0EA]">
							<AvatarFallback className="bg-[color:var(--background)]">
								<Github className="h-6 w-6 fill-[#F2F0EA]" />
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
						<Avatar className="border-2 border-[#F2F0EA] bg-[#F2F0EA]">
							<AvatarFallback className="bg-[color:var(--background)]">
								<Linkedin className="h-6 w-6 fill-[#F2F0EA]" />
							</AvatarFallback>
						</Avatar>
					</a>
				</div>
			</div>
		</div>
	);
};

export default Hero;
