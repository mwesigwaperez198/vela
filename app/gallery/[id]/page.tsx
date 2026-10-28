'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Design = {
  id: string;
  name: string;
  image: string;
  priceUGX: number;
};

type GalleryDetail = {
  id: string;
  title: string;
  culture: string;
  country: string;
  sex: 'women' | 'men' | 'unisex';
  description: string;
  designs: Design[];
};

const galleryDetails: Record<string, GalleryDetail> = {
  '1': {
    id: '1',
    title: 'Kente Royal Collection',
    culture: 'Akan',
    country: 'Ghana',
    sex: 'women',
    description: 'Exquisite handwoven Kente cloth reimagined for contemporary royal elegance, stitched with love and pride.',
    designs: [
      {
        id: 'd1',
        name: 'Royal Asaase',
        image: '/uploads/pics/cloth fashion brand.JPG',
        priceUGX: 4500000,
      },
      {
        id: 'd2',
        name: 'Golden Adinkra',
        image: '/uploads/pics/men & women fashion brand.jpeg',
        priceUGX: 4200000,
      },
      {
        id: 'd3',
        name: 'Nobility Wrap',
        image: '/uploads/pics/women fashion.JPG',
        priceUGX: 4800000,
      },
    ],
  },
  '2': {
    id: '2',
    title: 'Ankara Evening Wear',
    culture: 'Yoruba',
    country: 'Nigeria',
    sex: 'women',
    description: 'Bold Ankara prints crafted into sophisticated evening gowns, designed with love for special occasions.',
    designs: [
      {
        id: 'd4',
        name: 'Lagos Glamour',
        image: '/uploads/pics/women and men.jpeg',
        priceUGX: 3800000,
      },
      {
        id: 'd5',
        name: 'Owambe Queen',
        image: '/uploads/pics/women culture south africa.jpeg',
        priceUGX: 4100000,
      },
    ],
  },
  '3': {
    id: '3',
    title: 'Dashiki Tailoring',
    culture: 'West African',
    country: 'Nigeria',
    sex: 'men',
    description: 'Traditional dashiki styles tailored for the modern man, crafted with attention to detail and heritage.',
    designs: [
      {
        id: 'd6',
        name: 'Urban Dashiki',
        image: '/uploads/pics/men fashion 2.jpeg',
        priceUGX: 3500000,
      },
      {
        id: 'd7',
        name: 'Evening Dashiki',
        image: '/uploads/pics/men wear suit.JPG',
        priceUGX: 3800000,
      },
    ],
  },
  '4': {
    id: '4',
    title: 'Barkcloth Heritage',
    culture: 'Baganda',
    country: 'Uganda',
    sex: 'unisex',
    description: 'Heritage barkcloth reimagined into contemporary fashion pieces, a gift from the Baganda people with love.',
    designs: [
      {
        id: 'd8',
        name: 'Baganda Texture',
        image: '/uploads/pics/men suits.JPG',
        priceUGX: 3200000,
      },
      {
        id: 'd9',
        name: 'Nature\'s Bounty',
        image: '/uploads/pics/women garmets.jpeg',
        priceUGX: 3500000,
      },
    ],
  },
  '5': {
    id: '5',
    title: 'Shweshwe Elegance',
    culture: 'Tswana',
    country: 'Botswana',
    sex: 'women',
    description: 'Shweshwe patterns in elegant cuts for the modern woman, dyed with traditional methods and styled with love.',
    designs: [
      {
        id: 'd10',
        name: 'Tswana Pride',
        image: '/uploads/pics/women fashion brand 2.jpeg',
        priceUGX: 4000000,
      },
      {
        id: 'd11',
        name: 'Botswana Beauty',
        image: '/uploads/pics/women wear.jpeg',
        priceUGX: 4200000,
      },
    ],
  },
  '6': {
    id: '6',
    title: 'Kitenge Formal Wear',
    culture: 'Swahili',
    country: 'Kenya',
    sex: 'men',
    description: 'Vibrant Kitenge patterns crafted into formal wear for the modern gentleman, featuring authentic Swahili designs.',
    designs: [
      {
        id: 'd12',
        name: 'Swahili Splendor',
        image: '/uploads/pics/the way brand.jpeg',
        priceUGX: 4500000,
      },
      {
        id: 'd13',
        name: 'Kenya Classic',
        image: '/uploads/pics/men wear.JPG',
        priceUGX: 4800000,
      },
    ],
  },
};

export default function GalleryDetailPage({ params }: { params: { id: string } }) {
  const item = galleryDetails[params.id];

  if (!item) {
    return (
      <div className="min-h-screen pt-32 px-4 lg:px-10">
        <p className="text-neutral-500">Gallery item not found.</p>
        <Link href="/gallery" className="mt-4 inline-block border-b border-luxuryBlack pb-1 text-[11px] tracking-editorial uppercase">
          Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="px-4 lg:px-10">
        <div className="mb-12">
          <Link href="/gallery" className="text-[11px] tracking-editorial uppercase border-b border-luxuryBlack pb-1 hover:opacity-60 transition-opacity">
            ← Back to Gallery
          </Link>
        </div>

        <header className="mb-16 lg:mb-24 max-w-4xl">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight">{item.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-extralight tracking-editorial uppercase text-neutral-500 mb-6">
            <span>{item.sex}</span>
            <span>•</span>
            <span>{item.culture} Culture</span>
            <span>•</span>
            <span>{item.country}</span>
          </div>
          <p className="text-lg font-light text-neutral-600">{item.description}</p>
        </header>

        <div className="space-y-16 lg:space-y-24">
          {item.designs.map((design: Design, index: number) => (
            <div key={design.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className={`relative aspect-[3/4] overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Image
                  src={design.image}
                  alt={design.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <h2 className="font-serif text-4xl lg:text-5xl">{design.name}</h2>
                <p className="text-lg font-light">UGX {design.priceUGX.toLocaleString()}</p>
                <div className="flex gap-4">
                  <button className="border border-luxuryBlack px-8 py-3 text-[11px] tracking-editorial uppercase hover:bg-luxuryBlack hover:text-white transition-colors">
                    Enquire
                  </button>
                  <a
                    href={`https://wa.me/256765866555?text=Hi, I'm interested in ${design.name} from ${item.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-luxuryBlack px-8 py-3 text-[11px] tracking-editorial uppercase hover:bg-luxuryBlack hover:text-white transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}