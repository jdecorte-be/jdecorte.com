interface Work {
  title: string
  description: string
  href?: string
  imgSrc?: string
  buttonText?: string
}

const workData: Work[] = [
  {
    title: 'Wilink',
    description: `Wilink is a platform for creating and sharing interactive experiences. I worked on the frontend and backend systems, helping to build a scalable platform that could handle thousands of concurrent users. The project involved working with real-time data streaming and building a responsive UI that could adapt to different devices and screen sizes.`,
    imgSrc: '/static/images/works/wilink.png',
    href: 'https://wilink.be',
    buttonText: 'Visit Wilink',
  },
  {
    title: 'Tweetz',
    description: `Tweetz was a social media management tool that I helped develop. It allowed users to schedule posts, track engagement, and manage multiple social media accounts from a single dashboard.`,
    imgSrc: '/static/images/works/tweetz.png',
    // href: 'https://tweetz.com',
  },
  {
    title: '42 Belgium',
    description: `Instead of relying on noisy social networks to discover trending political news, quickly read top news stories and valuable insights from the community of newsmakers who know. \n\nSidewire closed it's doors in 2016.`,
    imgSrc: '/static/images/works/42be.png',
    href: 'https://42belgium.be',
  },
  {
    title: 'Louvain School of Engineering',
    description: `I was a student at the Louvain School of Engineering, where I studied computer science and engineering. This experience shaped my technical foundation and problem-solving skills.`,
    imgSrc: '/static/images/works/ucl.png',
    href: 'https://www.uclouvain.be/en',
  },
]

export default workData
