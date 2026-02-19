import Image from "next/image";
import siteMetadata from "@/data/siteMetadata.mjs";
import { AvatarGroup, AvatarGroupTooltip } from "@/components/animate-ui/components/animate/avatar-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Github, Linkedin } from "@/components/social-icons/icons";

const Hero = ({ heroFontStyles }) => {
	return (
		<div className="relative min-h-[500px] overflow-hidden rounded-md bg-[#6D962A] p-6 md:p-10 lg:min-h-0">
			<h1
				className={`${heroFontStyles} fade-in-down-headline text-5xl font-bold uppercase tracking-tighter text-[#DBE8A8]
           opacity-0 md:text-[114px] lg:leading-[114px] xl:text-[168px] xl:leading-[168px]`}
			>
				John Decorte
			</h1>
			<div className="flex">
				<p
					className={`fade-in-down pr-20 pt-10 text-[#042C0E] opacity-0 md:max-w-[300px] md:pt-24 xl:whitespace-pre`}
				>	
					{`Software designer and engineer \nwith a passion for creating— \nfrom innovative web \nsolutions to video games, \nmusic, and impactful \nsoftware projects.`}
					{/* {`Backend & Cybersec Engineer \nBuilding secure, real-time\nsystems for InsurTech\nand Social Media.`} */}
				</p>
				<Image
					src="/static/images/jdecorte_fullbody.png"
					alt="John Decorte"
					width={305}
					height={606}
					className={`image-animate-on-load absolute -bottom-10 right-0 w-[160px] opacity-0 drop-shadow-2xl md:right-48 md:top-24 md:w-[305px] xl:left-60`}
					priority
				/>
			</div>
			<div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
				<AvatarGroup translate="-40%">
					<a href={`mailto:${siteMetadata.email}`} className="block transition-transform hover:scale-110">
						<Avatar className="border-2 border-[#DBE8A8] bg-[#042C0E]">
							<AvatarFallback className="bg-[#042C0E]">
								<Mail className="h-6 w-6 fill-[#DBE8A8]" />
							</AvatarFallback>
							<AvatarGroupTooltip>Email</AvatarGroupTooltip>
						</Avatar>
					</a>
					<a href={siteMetadata.github} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-110">
						<Avatar className="border-2 border-[#DBE8A8] bg-[#042C0E]">
							<AvatarFallback className="bg-[#042C0E]">
								<Github className="h-6 w-6 fill-[#DBE8A8]" />
							</AvatarFallback>
							<AvatarGroupTooltip>GitHub</AvatarGroupTooltip>
						</Avatar>
					</a>
					<a href={siteMetadata.linkedin} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-110">
						<Avatar className="border-2 border-[#DBE8A8] bg-[#042C0E]">
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
