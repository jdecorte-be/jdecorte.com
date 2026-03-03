"use client";

import { AnimatePresence, motion } from "motion/react";
import { ComponentPropsWithoutRef, ReactNode, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  SiC,
  SiCplusplus,
  SiDotnet,
  SiCss3,
  SiDocker,
  SiGnubash,
  SiGo,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJson,
  SiKotlin,
  SiLua,
  SiMarkdown,
  SiPhp,
  SiPython,
  SiR,
  SiRuby,
  SiRust,
  SiSass,
  SiSwift,
  SiToml,
  SiTypescript,
  SiYaml,
} from "react-icons/si";
import { FaJava, FaTerminal, FaDatabase, FaCode, FaFileCode } from "react-icons/fa";
import { VscDiff } from "react-icons/vsc";

type PreProps = ComponentPropsWithoutRef<"pre">;

const LANGUAGE_ICONS: Record<string, IconType> = {
  js: SiJavascript,
  javascript: SiJavascript,
  ts: SiTypescript,
  typescript: SiTypescript,
  jsx: SiJavascript,
  tsx: SiTypescript,
  py: SiPython,
  python: SiPython,
  c: SiC,
  cpp: SiCplusplus,
  "c++": SiCplusplus,
  cs: SiDotnet,
  java: FaJava,
  go: SiGo,
  rs: SiRust,
  rust: SiRust,
  sh: FaTerminal,
  bash: SiGnubash,
  zsh: FaTerminal,
  fish: FaTerminal,
  html: SiHtml5,
  css: SiCss3,
  scss: SiSass,
  sass: SiSass,
  json: SiJson,
  yaml: SiYaml,
  yml: SiYaml,
  toml: SiToml,
  md: SiMarkdown,
  mdx: SiMarkdown,
  sql: FaDatabase,
  graphql: SiGraphql,
  gql: SiGraphql,
  dockerfile: SiDocker,
  docker: SiDocker,
  diff: VscDiff,
  xml: FaFileCode,
  swift: SiSwift,
  kotlin: SiKotlin,
  ruby: SiRuby,
  rb: SiRuby,
  php: SiPhp,
  r: SiR,
  lua: SiLua,
  asm: FaCode,
  nasm: FaCode,
};

function getLanguageIcon(className?: string): IconType | null {
  if (!className) return null;
  const match = className.split(" ").find((c) => c.startsWith("language-"));
  if (!match) return null;
  const lang = match.replace("language-", "").toLowerCase();
  return LANGUAGE_ICONS[lang] ?? null;
}

const execCopy = (text: string) => {
  const el = document.createElement("textarea");
  el.value = text;
  el.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

const Pre = ({ children, className, ...rest }: PreProps) => {
  const textInput = useRef<HTMLPreElement>(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyCount, setCopyCount] = useState(0);
  const LanguageIcon = getLanguageIcon(className);
  const langMatch = className?.split(" ").find((c) => c.startsWith("language-"));
  const langName = langMatch?.replace("language-", "") ?? "code";

  const onEnter = () => setHovered(true);

  const onExit = () => {
    setHovered(false);
    setCopied(false);
  };

  const onCopy = () => {
    if (copied) return;
    const text = textInput.current?.textContent ?? "";
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => execCopy(text));
    } else {
      execCopy(text);
    }
    setCopied(true);
    setCopyCount((c) => c + 1);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div onMouseEnter={onEnter} onMouseLeave={onExit} className="relative" role="region" aria-label={`${langName} code block`}>
      {/* copy button */}
      <AnimatePresence>
        {hovered && (
          <motion.button
            key="copy-btn"
            aria-label="Copy code"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className={`absolute right-2 top-2 h-8 w-8 rounded border-2 bg-gray-700 p-1 dark:bg-gray-800 ${
              copied
                ? "border-primary-400 focus:border-primary-400 focus:outline-none"
                : "border-gray-300 hover:border-primary-400"
            } transition-colors duration-200`}
            onClick={onCopy}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.svg
                  key="check"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  className="text-primary-400"
                  initial={{ opacity: 0, rotate: -15 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  key="copy"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  className="text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>

      <pre ref={textInput} className={className} {...rest}>
        {children}
      </pre>
      {LanguageIcon && (
        <span className="pointer-events-none absolute bottom-2 right-2 select-none text-gray-400" aria-hidden="true">
          <LanguageIcon size={16} />
        </span>
      )}
    </div>
  );
};

export default Pre;
