"use client";

import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
  useRegisterActions,
  useKBar,
  type Action,
} from "kbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ─── Custom modal ────────────────────────────────────────────────────────────

function RenderResults() {
  const { results } = useMatches();

  if (!results.length) {
    return (
      <div className="border-t border-green-900/40 px-4 py-8 text-center text-sm text-green-700">
        No results for your search…
      </div>
    );
  }

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className="border-t border-green-900/40 px-4 pb-2 pt-4 text-[10px] font-semibold uppercase tracking-widest text-green-600">
            {item}
          </div>
        ) : (
          <div
            className={`flex cursor-pointer items-center justify-between px-4 py-2.5 transition-colors ${
              active
                ? "bg-green-900/30 text-green-300"
                : "text-gray-400 hover:bg-green-900/10"
            }`}
          >
            <div className="flex min-w-0 items-center gap-3">
              {item.icon && (
                <span className="shrink-0 text-green-600">{item.icon}</span>
              )}
              <div className="min-w-0">
                {item.subtitle && (
                  <p
                    className={`truncate text-xs ${active ? "text-green-500" : "text-gray-600"}`}
                  >
                    {item.subtitle}
                  </p>
                )}
                <p className="truncate text-sm">{item.name}</p>
              </div>
            </div>
            {item.shortcut?.length ? (
              <div className="flex shrink-0 gap-1">
                {item.shortcut.map((sc) => (
                  <kbd
                    key={sc}
                    className={`flex h-5 min-w-[1.25rem] items-center justify-center rounded border px-1 text-[10px] font-medium ${
                      active
                        ? "border-green-700 text-green-400"
                        : "border-gray-700 text-gray-500"
                    }`}
                  >
                    {sc}
                  </kbd>
                ))}
              </div>
            ) : null}
          </div>
        )
      }
    />
  );
}

function CustomKBarModal({
  actions,
  isLoading,
}: {
  actions: Action[];
  isLoading: boolean;
}) {
  useRegisterActions(actions, [actions]);

  return (
    <KBarPortal>
      <KBarPositioner className="z-50 flex items-start justify-center bg-black/70 p-4 pt-[15vh] backdrop-blur-sm">
        <KBarAnimator className="w-full max-w-xl">
          <div
            className="overflow-hidden rounded-xl border border-green-900/50 bg-[#000E04] shadow-[0_0_30px_0_rgba(0,255,128,0.08)]"
          >
            {/* Search input row */}
            <div className="flex items-center gap-3 px-4 py-3">
              <svg
                className="h-4 w-4 shrink-0 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <KBarSearch
                className="h-8 w-full bg-transparent text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-0 focus:border-green-700"
                defaultPlaceholder="Search writeups, pages…"
              />
              <kbd className="inline-flex shrink-0 items-center rounded border border-green-900/60 px-1.5 py-0.5 text-[10px] font-medium text-green-700">
                ESC
              </kbd>
            </div>

            {/* Divider */}
            <div className="h-px bg-green-900/40" />

            {/* Results */}
            <div className="max-h-80 overflow-y-auto py-1 scrollbar-thin">
              {isLoading ? (
                <div className="px-4 py-8 text-center text-sm text-green-700">
                  Loading…
                </div>
              ) : (
                <RenderResults />
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center gap-3 border-t border-green-900/40 px-4 py-2 text-[10px] text-gray-700">
              <span>
                <kbd className="mr-1 rounded border border-gray-800 px-1">↑</kbd>
                <kbd className="mr-1 rounded border border-gray-800 px-1">↓</kbd>
                navigate
              </span>
              <span>
                <kbd className="mr-1 rounded border border-gray-800 px-1">↵</kbd>
                open
              </span>
            </div>
          </div>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}

// ─── Provider ────────────────────────────────────────────────────────────────

interface SearchConfig {
  provider: "kbar";
  kbarConfig: {
    searchDocumentsPath: string;
  };
}

interface Props {
  searchConfig: SearchConfig;
  children: React.ReactNode;
}

function SearchLoader({
  searchDocumentsPath,
  children,
}: {
  searchDocumentsPath: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [searchActions, setSearchActions] = useState<Action[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const url =
        searchDocumentsPath.indexOf("://") > 0 ||
        searchDocumentsPath.indexOf("//") === 0
          ? searchDocumentsPath
          : new URL(searchDocumentsPath, window.location.origin).toString();

      const res = await fetch(url);
      const json = await res.json();

      const actions: Action[] = json.map(
        (post: { path: string; title: string; summary?: string; date?: string }) => ({
          id: post.path,
          name: post.title,
          keywords: post.summary ?? "",
          section: "Content",
          subtitle: post.date
            ? new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : undefined,
          perform: () => router.push("/" + post.path),
        })
      );

      setSearchActions(actions);
      setDataLoaded(true);
    }

    if (!dataLoaded) fetchData();
  }, [dataLoaded, router, searchDocumentsPath]);

  return (
    <>
      <CustomKBarModal actions={searchActions} isLoading={!dataLoaded} />
      {children}
    </>
  );
}

export function CustomKBarSearchProvider({ searchConfig, children }: Props) {
  return (
    <KBarProvider>
      <SearchLoader
        searchDocumentsPath={searchConfig.kbarConfig.searchDocumentsPath}
      >
        {children}
      </SearchLoader>
    </KBarProvider>
  );
}
