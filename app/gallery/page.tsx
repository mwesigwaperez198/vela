'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type GalleryCategory = {
  id: string;
  title: string;
  sex: 'women' | 'men' | 'unisex';
  culture: string;
  country: string;
  image: string;
  designs: number;
};

const galleryItems: GalleryCategory[] = [
  {
    id: '1',
    title: 'Kente Royal Collection',
    sex: 'women',
    culture: 'Akan',
    country: 'Ghana',
    image: '/uploads/pics/cloth fashion brand.JPG',
    designs: 12,
  },
  {
    id: '2',
    title: 'Ankara Evening Wear',
    sex: 'women',
    culture: 'Yoruba',
    country: 'Nigeria',
    image: '/uploads/pics/men & women fashion brand.jpeg',
    designs: 18,
  },
  {
    id: '3',
    title: 'Dashiki Tailoring',
    sex: 'men',
    culture: 'West African',
    country: 'Nigeria',
    image: '/uploads/pics/men 1.jpeg',
    designs: 15,
  },
  {
    id: '4',
    title: 'Barkcloth Heritage',
    sex: 'unisex',
    culture: 'Baganda',
    country: 'Uganda',
    image: '/uploads/pics/men suits.JPG',
    designs: 10,
  },
  {
    id: '5',
    title: 'Shweshwe Elegance',
    sex: 'women',
    culture: 'Tswana',
    country: 'Botswana',
    image: '/uploads/pics/women fashion.JPG',
    designs: 14,
  },
  {
    id: '6',
    title: 'Kitenge Formal Wear',
    sex: 'men',
    culture: 'Swahili',
    country: 'Kenya',
    image: '/uploads/pics/men wear.JPG',
    designs: 16,
  },
];

export default function GalleryPage() {
  const [filterSex, setFilterSex] = useState<'all' | 'women' | 'men' | 'unisex'>('all');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [filterCulture, setFilterCulture] = useState<string>('all');

  const countries = ['all', ...new Set(galleryItems.map((item) => item.country))];
  const cultures = ['all', ...new Set(galleryItems.map((item) => item.culture))];

  const filteredItems = galleryItems.filter((item) => {
    if (filterSex !== 'all' && item.sex !== filterSex) return false;
    if (filterCountry !== 'all' && item.country !== filterCountry) return false;
    if (filterCulture !== 'all' && item.culture !== filterCulture) return false;
    return true;
  });

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="px-4 lg:px-10">
        <header className="mb-16 lg:mb-24">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight">
            DA-VELA Gallery Collection
          </h1>
          <p className="text-lg font-light text-neutral-600 max-w-2xl">
            A curated showcase of African fashion heritage, stitched with love and pride.
          </p>
        </header>

        <div className="mb-12 flex flex-wrap gap-6 text-[11px] font-extralight tracking-editorial uppercase">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-neutral-500">Sex:</span>
            {['all', 'women', 'men', 'unisex'].map((sex) => (
              <button
                key={sex}
                onClick={() => setFilterSex(sex)}
                className={`pb-1 ${
                  filterSex === sex
                    ? 'border-b border-luxuryBlack'
                    : 'border-b border-transparent hover:border-neutral-300'
                } transition-colors`}
              >
                {sex === 'all' ? 'All' : sex}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-neutral-500">Country:</span>
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => setFilterCountry(country)}
                className={`pb-1 ${
                  filterCountry === country
                    ? 'border-b border-luxuryBlack'
                    : 'border-b border-transparent hover:border-neutral-300'
                } transition-colors`}
              >
                {country === 'all' ? 'All' : country}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-neutral-500">Culture:</span>
            {cultures.map((culture) => (
              <button
                key={culture}
                onClick={() => setFilterCulture(culture)}
                className={`pb-1 ${
                  filterCulture === culture
                    ? 'border-b border-luxuryBlack'
                    : 'border-b border-transparent hover:border-neutral-300'
                } transition-colors`}
              >
                {culture === 'all' ? 'All' : culture}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={`/gallery/${item.id}`}
              className="group cursor-pointer"
            >
              <div
                className="relative aspect-[3/4] overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-700"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-opacity duration-500 group-hover:opacity-90"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h2 className="font-serif text-2xl lg:text-3xl group-hover:opacity-70 transition-opacity mb-2">
                  {item.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-extralight tracking-editorial uppercase text-neutral-500">
                  <span>{item.sex}</span>
                  <span>•</span>
                  <span>{item.culture}</span>
                  <span>•</span>
                  <span>{item.country}</span>
                  <span>•</span>
                  <span>{item.designs} designs</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-500 font-light">No designs match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}