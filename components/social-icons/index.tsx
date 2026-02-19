import {
  Mail,
  Github,
  Facebook,
  Youtube,
  Linkedin,
  Bluesky,
  Mastodon,
  Threads,
  Instagram,
} from './icons'

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  bluesky: Bluesky,
  mastodon: Mastodon,
  threads: Threads,
  instagram: Instagram,
}

type SocialIconProps = {
  kind: keyof typeof components
  href: string | undefined
  size?: number
}

const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (!href || (kind === 'mail' && !href.startsWith('mailto:')))
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      data-umami-event={`Clicked ${kind}`}
      aria-label={`Visit ${kind} profile`}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className="fill-current text-gray-700 transition-all duration-300 ease-in-out hover:scale-125 hover:text-gray-400 dark:text-gray-200 dark:hover:text-gray-100"
        style={{ height: `${size * 0.25}rem`, width: `${size * 0.25}rem` }}
      />
    </a>
  )
}

export default SocialIcon
