'use client'

import Image from 'next/image'

import Autoplay from 'embla-carousel-autoplay'

import { cn } from '@/lib/utils'

import TextType from '@/components/text-type'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel'

interface CarouselFormProps {
  className?: string
}

const CarouselForm = ({ className }: CarouselFormProps) => {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true
      }}
      plugins={[
        Autoplay({
          delay: 5000
        })
      ]}
      className='hidden h-full w-full md:block'
    >
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index}>
            <div
              className={cn(
                'relative h-[480px] w-full overflow-hidden rounded-lg',
                className
              )}
            >
              <Image
                src={`/carousel/image-${index + 1}.png`}
                alt={`Imagen ${index + 1}`}
                fill
                className='object-cover'
              />

              <div className='absolute right-0 bottom-0 left-0 flex h-full items-end justify-end bg-linear-to-t from-black/50 via-black/20 to-transparent p-4'>
                <TextType
                  text={[
                    'Bienvenido a verrysala',
                    'Tu blog personal sobre la playa de salaverry',
                    'Disfruta leyendo y compartiendo tus vivencias'
                  ]}
                  typingSpeed={75}
                  pauseDuration={2000}
                  showCursor={true}
                  cursorCharacter='|'
                  className='text-right text-lg font-bold'
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export { CarouselForm }
