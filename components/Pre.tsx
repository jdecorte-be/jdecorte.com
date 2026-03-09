"use client";

import { AnimatePresence, motion } from "motion/react";
import { ComponentPropsWithoutRef, useRef, useState } from "react";
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
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
      className="relative my-5 sm:my-6"
      role="region"
      aria-label={`${langName} code block`}
    >
      {/* copy button — sticky so it stays visible when scrolling */}
      {/* <div className="sticky right-0 top-0 z-10 float-right h-0 w-0">
        <motion.button
          key="copy-btn"
          aria-label="Copy code"
          whileTap={{ scale: 0.92 }}
          className={`absolute right-2 top-2 h-7 w-7 rounded-md border p-1 backdrop-blur-sm transition-all duration-200
            ${copied
              ? "border-emerald-500/60 bg-emerald-500/10 text-emerald-400 opacity-100"
              : hovered
                ? "border-white/10 bg-white/5 text-gray-400 opacity-100 hover:border-white/25 hover:bg-white/10 hover:text-gray-200"
                : "border-white/10 bg-white/5 text-gray-400 opacity-60 sm:opacity-0"
            }`}
          onClick={onCopy}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.svg ... />
            ) : (
              <motion.svg ... />
            )}
          </AnimatePresence>
        </motion.button>
      </div> */}

      <pre
        ref={textInput}
        className={`${className ?? ""} !my-0 text-[11px] sm:text-sm lg:text-base overflow-x-auto overflow-y-auto max-h-[50vh] sm:max-h-[70vh] lg:max-h-[80vh] rounded-md p-3 sm:p-4 lg:p-5 leading-relaxed text-left`}
        {...rest}
      >
        {children}
      </pre>

      {/* language icon — sticky to bottom-right of visible area */}
      {/* {LanguageIcon && (
        <div className="pointer-events-none sticky right-0 bottom-0 float-right -mt-7 mr-2 mb-2 hidden h-0 select-none sm:block">
          <span style={{ color: "rgb(58, 61, 72)" }} aria-hidden="true">
            <LanguageIcon size={16} />
          </span>
        </div>
      )} */}
    </div>
  );
};

export default Pre;