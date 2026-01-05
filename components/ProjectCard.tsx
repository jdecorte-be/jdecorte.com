"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Image from "./Image";
import Link from "./Link";
import ProjectButton from "./ProjectButton";

interface Props {
  title: string;
  imgSrc?: string;
  href?: string;
  children?: ReactNode;
  buttonText: string;
  buttonColor?: string;
}

const ProjectCard = ({
  title,
  imgSrc,
  href,
  children,
  buttonText,
  buttonColor,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="project-card-blur group relative w-full md:w-1/2 md:max-w-[348px] xl:w-1/3 xl:max-w-[330px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex h-full flex-col justify-between p-6">
        {imgSrc && (
          <div 
            className={`
              absolute left-1/2 z-30 w-[120%] -translate-x-1/2 overflow-hidden rounded-xl shadow-2xl
              transition-all duration-300 ease-out
              ${isHovered 
                ? '-top-4 opacity-100 scale-100' 
                : 'top-1/2 opacity-0 scale-95 translate-y-4'
              }
            `}
            style={{
              aspectRatio: '16/9',
              pointerEvents: 'none',
              transform: isHovered 
                ? 'translateX(-50%) translateY(-100%) scale(1.05)' 
                : 'translateX(-50%) translateY(-50%) scale(0.95)'
            }}
          >
            <Image
              alt={title}
              src={imgSrc}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-100"
              width={800}
              height={450}
              priority
            />
          </div>
        )}
        <div className="relative z-20">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <Link
                href={href}
                aria-label={`Link to ${title}`}
                data-umami-event={`Clicked ${title}`}
                className="hover:underline"
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <div className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400 ">
            {children}
          </div>
        </div>
        <ProjectButton 
          as={href ? "a" : "button"}
          href={href}
          buttonColor={buttonColor}
        >
          {buttonText}
        </ProjectButton>
      </div>
    </div>
  );
};

export default ProjectCard;
