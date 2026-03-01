"use client"
import { useRef, useState } from 'react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';

// src/ui/Pre.tsx
var Pre = ({ children }) => {
  const textInput = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const onEnter = () => {
    setHovered(true);
  };
  const onExit = () => {
    setHovered(false);
    setCopied(false);
  };
  const onCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(textInput.current.textContent);
    setTimeout(() => {
      setCopied(false);
    }, 2e3);
  };
  return /* @__PURE__ */ jsxs("div", { ref: textInput, onMouseEnter: onEnter, onMouseLeave: onExit, className: "relative", children: [
    hovered && /* @__PURE__ */ jsx(
      "button",
      {
        "aria-label": "Copy code",
        className: `absolute right-2 top-2 h-8 w-8 rounded border-2 bg-gray-700 p-1 dark:bg-gray-800 ${copied ? "border-green-400 focus:border-green-400 focus:outline-none" : "border-gray-300"}`,
        onClick: onCopy,
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            fill: "none",
            className: copied ? "text-green-400" : "text-gray-300",
            children: copied ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              }
            ) }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              }
            ) })
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("pre", { children })
  ] });
};
var Pre_default = Pre;

export { Pre_default as default };
