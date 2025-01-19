import Map from "@/components/Map"
import Image from "next/image"
import HorizontalCollection from "../_components/Gallary/HorizontalCollection"

export default function Photo() {
  const images = [
    { src: '/test_images/1.JPG', alt: 'Casamar 2019 1' },
    { src: '/test_images/2.JPG', alt: 'Casamar 2019 2' },
    { src: '/test_images/3.JPG', alt: 'Casamar 2019 3' },
    { src: '/test_images/4.JPG', alt: 'Casamar 2019 4' },
    { src: '/test_images/5.JPG', alt: 'Casamar 2019 4' }
  ];

  const collection1 = [
    { src: '/test_images/1.JPG', alt: 'Casamar 2019 1' },
    { src: '/test_images/2.JPG', alt: 'Casamar 2019 2' },
    { src: '/test_images/3.JPG', alt: 'Casamar 2019 3' },
    { src: '/test_images/4.JPG', alt: 'Casamar 2019 4' },
    { src: '/test_images/5.JPG', alt: 'Casamar 2019 4' }
  ];

  const collection2 = [
    { src: '/test_images/6.JPEG', alt: 'Casamar 2019 1' },
    { src: '/test_images/7.JPEG', alt: 'Casamar 2019 2' },
    { src: '/test_images/8.JPG', alt: 'Casamar 2019 3' },
    { src: '/test_images/9.JPG', alt: 'Casamar 2019 4' },
    { src: '/test_images/10.JPG', alt: 'Casamar 2019 4' }
  ];

  return (
    <div className="flex flex-col">
      <HorizontalCollection
        images={collection1}
        collectionName="Casamar Collection"
        collectionUrl="/collections/casamar"
      />
      
      <HorizontalCollection
        images={collection2}
        collectionName="Casamar Collection"
        collectionUrl="/collections/casamar"
      />
      <Map map_id={"f42c54f4-4980-45d3-8c56-9b5507cdb0e3"} map_key={"7xjMkfdVRW7qr2HNUzWN"} />
    </div>
    )
}