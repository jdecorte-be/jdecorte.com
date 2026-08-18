"use client";

import dynamic from "next/dynamic";

const Comments = dynamic(() => import("./Comments"), { ssr: false });

export default function LazyComments({ slug }: { slug: string }) {
	return <Comments slug={slug} />;
}
