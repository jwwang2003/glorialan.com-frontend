import Link from 'next/link'
import Image from 'next/image'

export default function HorizontalCollection({
  images = [], 
  collectionName = 'Collection Title', 
  collectionUrl = '/'
}: {
  images: { src: string, alt: string }[],
  collectionName: string,
  collectionUrl: string
}) {
  return (
    <div className="horizontal-collection" >
      {/* Title and CTA */}
      <div className="flex flex-row items-center">
        <h2 className="p-2 text-xl font-light">{collectionName}</h2>
        <Link href={collectionUrl} className='ml-auto'>
          <p className="text-sm text-black px-4 py-2">
            View More →
          </p>
        </Link>
      </div>

      {/* Collection Wrapper */}
      <div className="flex flex-row w-auto h-full overflow-y-visible overflow-x-scroll">
          {images.map((img, index) => (
              <Image
                key={index}
                objectFit='contain'
                src={img.src} 
                alt={img.alt || `${collectionName} image ${index + 1}`}
                width={5000} 
                height={3333}
              />
          ))}
      </div>
    </div>
  )
}