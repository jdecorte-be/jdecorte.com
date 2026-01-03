interface Work {
  title: string
  description: string
  href?: string
  imgSrc?: string
  buttonText?: string
}

interface Education {
  institution: string
  degree: string
  field: string
  year: string
  description?: string
  href?: string
  imgSrc?: string
}

const workData: Work[] = [
  {
    title: 'Sensible',
    description: `Continuing my theme of building useful tools, Sensible helps teams transform documents into structured data. Many businesses still rely on PDFs to collect and transfer information across systems. At Sensible, I focused on designing and building the user interface for our groundbreaking data-extraction products.

Rather than companies building their own tools internally, we provide a plug-and-play platform that accepts documents and returns structured data tailored to each customer. While much of the magic happens behind the scenes, our interface gives customers precise control over what is extracted and how. I joined as the second hire and helped grow the team and launch our first products.`,
    imgSrc: '/static/images/work/42.png',
    href: 'https://sensible.so',
  },
  {
    title: 'Newfront Insurance',
    description: `I was the second software engineer to join the team and also served as product designer through year three. Newfront is a modern insurance brokerage working to raise the status quo of the industry and give brokers a place to do their best work.

I helped design and build tools for account managers, brokers, and clients—everything from product planning and design (features, marketing materials, branding) to shipping production software on a daily cadence.`,
    imgSrc: '/static/images/work/tweetz.png',
    href: 'https://newfront.com',
  },
]

const educationData: Education[] = [
  {
    institution: 'University of California, Berkeley',
    degree: 'Bachelor of Arts',
    field: 'Computer Science',
    year: '2012',
    description: 'Focused on software engineering, algorithms, and human-computer interaction. Completed coursework in data structures, machine learning, and user interface design.',
  },
]

export default workData
export { educationData }
