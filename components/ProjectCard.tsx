"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  imgSrc?: string;
  href: string;
  children?: ReactNode;
  buttonText: string;
  tags?: string[];
  size?: "large" | "small";
}

const ProjectCard = ({
  title,
  imgSrc,
  href,
  children,
  buttonText,
  tags = [],
  size = "small",
}: Props) => {
  const isLarge = size === "large";

  return (
    <Link href={href} className="group block h-full">
      {/* 
        Main Container: 
        - bg-white/70: Semi-opaque for legibility
        - backdrop-blur-xl: Creates the high-end glass effect
      */}
      <div className="relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-gray-200/50 bg-white/70 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/90 hover:shadow-2xl hover:shadow-green-500/20 dark:border-white/10 dark:bg-gray-900/70 dark:hover:bg-gray-900/90">
        
        {/* Image Section */}
        <div className={`relative w-full overflow-hidden ${
          isLarge ? "h-80 md:h-[700px]" : "h-64"
        }`}>
          {imgSrc && (
            <Image
              alt={title}
              src={imgSrc}
              fill
              className="object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-110"
            />
          )}
          
          {/* Gradient overlay to help image blend into the glass bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent dark:from-gray-900/40" />

          {/* Tags */}
          <div className="absolute left-6 top-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-900 backdrop-blur-md dark:bg-gray-950/80 dark:text-white">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content Section (Translucent) */}
        <div className="flex flex-1 flex-col p-8 md:p-10">
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <h3 className={`${isLarge ? "text-2xl md:text-3xl" : "text-xl"} font-black tracking-tight text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors`}>
                {title}
              </h3>
              
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-900/10 bg-white/50 transition-all group-hover:bg-green-500 dark:border-white/10 dark:bg-white/5">
                <svg className="h-4 w-4 text-gray-900 transition-colors group-hover:text-white dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>

            <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 md:text-base">
              {children}
            </div>
          </div>

          {/* Button */}
          <div className="mt-8">
            <div className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-bold text-white transition-all group-hover:bg-green-600 dark:bg-white dark:text-gray-900 dark:group-hover:bg-green-400">
              {buttonText}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Inner Shine (Depth Effect) */}
        <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] border border-white/40 dark:border-white/10" />
      </div>
    </Link>
  );
};

export default ProjectCard;