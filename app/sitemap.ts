import type { MetadataRoute } from 'next'
import { allWriteups } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata.mjs'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const writeupsRoutes = allWriteups
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod ?? post.date,
    }))

  const routes = ['', 'writeups', 'work', 'latest'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...writeupsRoutes]
}
