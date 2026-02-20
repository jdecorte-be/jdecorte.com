"use client";

import { ReactNode, useRef } from "react";
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
  index?: number;
}

const ProjectCard = ({
  title,
  imgSrc,
  href,
  children,
  buttonText,
  tags = [],
  size = "small",
  index = 0,
}: Props) => {
  const isLarge = size === "large";
  const indexLabel = String(index + 1).padStart(2, "0");

  return (
    <Link href={href} className="group block h-full">
      <div className="relative flex h-full flex-col overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:border-green-500 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-green-500">

        {/* Top bar — index + tags */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3 dark:border-gray-800">
          <span className="font-mono text-xs font-bold tracking-widest text-gray-400 dark:text-gray-600">
            /{indexLabel}
          </span>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Image */}
        <div
          className={`relative w-full shrink-0 overflow-hidden ${
            isLarge ? "h-72 md:h-[560px]" : "h-52"
          }`}
        >
          {imgSrc && (
            <Image
              alt={title}
              src={imgSrc}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] saturate-[0.85] group-hover:saturate-100"
            />
          )}
          {/* Green tint reveal on hover */}
          <div className="absolute inset-0 bg-green-500/0 transition-colors duration-500 group-hover:bg-green-500/10" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
          <div className="flex flex-1 flex-col gap-2">
            <h3
              className={`${
                isLarge ? "text-2xl md:text-3xl" : "text-lg"
              } font-extrabold leading-tight tracking-tight text-gray-900 transition-colors group-hover:text-green-600 dark:text-white dark:group-hover:text-green-400`}
            >
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 md:text-base">
              {children}
            </p>
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 transition-colors group-hover:text-green-500 dark:text-gray-600 dark:group-hover:text-green-400">
              {buttonText}
            </span>
            {/* Animated arrow */}
            <div className="flex h-8 w-8 items-center justify-center border border-gray-200 transition-all duration-300 group-hover:border-green-500 group-hover:bg-green-500 dark:border-gray-800 dark:group-hover:border-green-500">
              <svg
                className="h-3.5 w-3.5 text-gray-600 transition-all duration-300 group-hover:-rotate-45 group-hover:text-white dark:text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;