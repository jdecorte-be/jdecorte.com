import { Antonio } from 'next/font/google'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allWriteups } from 'contentlayer/generated'
import Main from './Main'

const antonio = Antonio({
  subsets: ['latin'],
})

export default async function Page() {
  const sortedPosts = sortPosts(allWriteups)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} heroFontStyles={antonio.className} />
}
