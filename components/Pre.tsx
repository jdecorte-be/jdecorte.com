"use client";

import { AnimatePresence, motion } from "motion/react";
import { ReactNode, useRef, useState } from "react";

interface PreProps {
  children: ReactNode;
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

const Pre = ({ children }: PreProps) => {
  const textInput = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyCount, setCopyCount] = useState(0);

  const onEnter = () => setHovered(true);

  const onExit = () => {
    setHovered(false);
    setCopied(false);
  };

  const onCopy = () => {
    if (copied) return;
    const text = textInput.current?.textContent ?? "";
    const write = () => {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).catch(() => execCopy(text));
      } else {
        execCopy(text);
      }
    };
    write();
    setCopied(true);
    setCopyCount((c) => c + 1);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div ref={textInput} onMouseEnter={onEnter} onMouseLeave={onExit} className="group relative">
      {/* writing cursor animation */}
      <span
        className="pointer-events-none absolute bottom-3 right-3 h-4 w-[2px] bg-primary-400 opacity-0 group-hover:opacity-100"
        style={{ animation: "blink 1s step-end infinite" }}
      />

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
                ? "border-green-400 focus:border-green-400 focus:outline-none"
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
                  className="text-green-400"
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

      {/* copy log notification */}


      <pre>{children}</pre>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Pre;
