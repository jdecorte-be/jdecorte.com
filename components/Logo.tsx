import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex items-center justify-between">
      <div className="mr-1">
        <Image src="/static/images/jd-white.png" alt="logo" width="70" height="70" priority />
      </div>
    </div>
  )
}
