import Image from "next/image";
import {
	AvatarGroup,
	AvatarGroupTooltip,
} from "@/components/animate-ui/components/animate/avatar-group";
import { Github, Linkedin, Mail } from "@/components/social-icons/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import siteMetadata from "@/data/siteMetadata.mjs";

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
					{`Software designer and engineer \nwith a passion for creating— \nfrom innovative web \nsolutions to video games, \nmusic, and impactful \nsoftware projects.`}
					{/* {`Backend & Cybersec Engineer \nBuilding secure, real-time\nsystems for InsurTech\nand Social Media.`} */}
				</p>
				<Image
					src="/static/images/jdecorte_fullbody.webp"
					alt="John Decorte"
					width={305}
					height={606}
					className={`image-animate-on-load absolute -bottom-10 right-0 w-[160px] opacity-0 drop-shadow-2xl md:right-48 md:top-24 md:w-[305px] xl:left-60`}
					priority
					blurDataURL="data:image/webp;base64,UklGRq4AAABXRUJQVlA4WAoAAAAQAAAABwAACgAAQUxQSFIAAAANcFrbtuKcYXQ8oyAKK0gxkWkifvpJHcwMmh1TGxERQFJbtv/g5MY2f4AesxeA8MIYcBpQXH2kJlC/tvwqYBcG4RvAPzh3gPB8k1VA+C/kAnABVlA4IDYAAACQAQCdASoIAAsAA4BaJQAAS0t1JwAA/vDhGkK0hbk51VqofGbblt/5LiS0AMeQ6XSF5FjnwAA="
				/>
			</div>
			<div className="absolute bottom-4 left-4 md:bottom-6 md:left-auto md:right-6">
				<AvatarGroup translate="-40%">
					<a
						href={`mailto:${siteMetadata.email}`}
						className="block transition-transform hover:scale-110"
					>
						<Avatar className="border-2 border-[#DBE8A8] bg-[#DBE8A8]">
							<AvatarFallback className="bg-[#042C0E]">
								<Mail className="h-6 w-6 fill-[#DBE8A8]" />
							</AvatarFallback>
							<AvatarGroupTooltip>Email</AvatarGroupTooltip>
						</Avatar>
					</a>
					<a
						href={siteMetadata.github}
						target="_blank"
						rel="noopener noreferrer"
						className="block transition-transform hover:scale-110"
					>
						<Avatar className="border-2 border-[#DBE8A8] bg-[#DBE8A8]">
							<AvatarFallback className="bg-[#042C0E]">
								<Github className="h-6 w-6 fill-[#DBE8A8]" />
							</AvatarFallback>
							<AvatarGroupTooltip>GitHub</AvatarGroupTooltip>
						</Avatar>
					</a>
					<a
						href={siteMetadata.linkedin}
						target="_blank"
						rel="noopener noreferrer"
						className="block transition-transform hover:scale-110"
					>
						<Avatar className="border-2 border-[#DBE8A8] bg-[#DBE8A8]">
							<AvatarFallback className="bg-[#042C0E]">
								<Linkedin className="h-6 w-6 fill-[#DBE8A8]" />
							</AvatarFallback>
							<AvatarGroupTooltip>LinkedIn</AvatarGroupTooltip>
						</Avatar>
					</a>
				</AvatarGroup>
			</div>
		</div>
	);
};

export default Hero;
