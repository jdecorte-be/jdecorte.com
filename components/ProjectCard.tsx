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
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200/30 bg-white/60 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-gray-300/40 hover:bg-white/80 hover:shadow-xl hover:shadow-gray-200/50 dark:border-gray-800/30 dark:bg-gray-900/60 dark:hover:border-gray-700/40 dark:hover:bg-gray-900/80 dark:hover:shadow-gray-900/50">
        
        {/* Image Section */}
        <div className={`relative w-full overflow-hidden ${
          isLarge ? "h-80 md:h-[700px]" : "h-64"
        }`}>
          {imgSrc && (
            <Image
              alt={title}
              src={imgSrc}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
          )}
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent dark:from-gray-900/30" />

          {/* Tags */}
          {tags.length > 0 && (
            <div className="absolute left-6 top-6 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-800 backdrop-blur-sm dark:bg-gray-900/90 dark:text-gray-200">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-8 md:p-10">
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <h3 className={`${isLarge ? "text-2xl md:text-3xl" : "text-xl"} font-bold tracking-tight text-gray-900 transition-colors dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400`}>
                {title}
              </h3>
              
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 transition-all group-hover:bg-green-500 dark:bg-gray-800 dark:group-hover:bg-green-500">
                <svg className="h-4 w-4 text-gray-700 transition-colors group-hover:text-white dark:text-gray-300 dark:group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 md:text-base">
              {children}
            </p>
          </div>

          {/* Button */}
          <div className="mt-6">
            <span className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-all group-hover:bg-green-600 dark:bg-white dark:text-gray-900 dark:group-hover:bg-green-400">
              {buttonText}
              <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;