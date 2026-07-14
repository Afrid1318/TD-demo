import { Facebook, Twitter, Youtube } from 'lucide-react'
import { SOCIAL_LINKS } from '../../constants/content'

const LINKS = [
  { key: 'facebook', href: SOCIAL_LINKS.facebook, Icon: Facebook, ring: 'border-[#3b5998] text-[#3b5998]' },
  { key: 'twitter', href: SOCIAL_LINKS.twitter, Icon: Twitter, ring: 'border-brand-teal text-brand-teal' },
  { key: 'youtube', href: SOCIAL_LINKS.youtube, Icon: Youtube, ring: 'border-red-500 text-red-500' },
]

export function SocialLinks({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'
  const iconSize = size === 'sm' ? 14 : 16

  return (
    <div className="flex items-center gap-3">
      {LINKS.map(({ key, href, Icon, ring }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit our ${key} page`}
          className={`flex ${dim} items-center justify-center rounded-full border-2 bg-brand-black/60 transition-transform hover:scale-110 ${ring}`}
        >
          <Icon size={iconSize} aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}
