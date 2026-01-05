import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allWriteups } from 'contentlayer/generated'
import Latest from './Latest'

export default async function Page() {
  const sortedPosts = sortPosts(allWriteups)
  const posts = allCoreContent(sortedPosts)
  return <Latest posts={posts} />
}
