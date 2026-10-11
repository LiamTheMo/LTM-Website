"use client";

import { useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui";

const outsideTechPhotos = [
  {
    src: "/homepage/outside-tech/photo-01.avif",
    alt: "Liam smiling and holding a small fish he caught, with grassy hills and a blue sky behind him.",
  },
  {
    src: "/homepage/outside-tech/photo-02.avif",
    alt: "Liam at the gym on a bench press with a training partner.",
  },
  {
    src: "/homepage/outside-tech/photo-03.avif",
    alt: "Liam adding fresh herbs to a bowl of pho at a restaurant.",
  },
  {
    src: "/homepage/outside-tech/photo-04.avif",
    alt: "A moment from Liam's life outside technology.",
  },
  {
    src: "/homepage/outside-tech/photo-05.avif",
    alt: "A moment from Liam's life outside technology.",
  },
  {
    src: "/homepage/outside-tech/photo-06.avif",
    alt: "A moment from Liam's life outside technology.",
  },
  {
    src: "/homepage/outside-tech/photo-07.avif",
    alt: "A moment from Liam's life outside technology.",
  },
  {
    src: "/homepage/outside-tech/photo-08.avif",
    alt: "A moment from Liam's life outside technology.",
  },
  {
    src: "/homepage/outside-tech/photo-09.avif",
    alt: "A moment from Liam's life outside technology.",
  },
  {
    src: "/homepage/outside-tech/photo-10.avif",
    alt: "A moment from Liam's life outside technology.",
  },
];

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

export default function OutsideTechSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({ active: false, startX: 0, startScrollLeft: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  function getNearestPhotoIndex() {
    const track = trackRef.current;
    if (!track) return 0;

    const slides = Array.from(track.children) as HTMLElement[];
    if (slides.length === 0) return 0;

    const viewportCenter = track.scrollLeft + track.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const distance = Math.abs(slideCenter - viewportCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    return nearestIndex;
  }

  function scrollToPhoto(index: number) {
    const track = trackRef.current;
    if (!track) return;

    const nextIndex = Math.max(0, Math.min(index, outsideTechPhotos.length - 1));
    const slide = track.children.item(nextIndex) as HTMLElement | null;
    if (!slide) return;

    const centeredLeft = slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    track.scrollTo({
      left: Math.max(0, Math.min(centeredLeft, maxScrollLeft)),
      behavior: "smooth",
    });
  }

  function handleScroll() {
    setActiveIndex(getNearestPhotoIndex());
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const track = trackRef.current;
    if (!track) return;

    dragStateRef.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
    };
    setIsDragging(true);
    track.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !dragStateRef.current.active) return;

    const track = trackRef.current;
    if (!track) return;

    const deltaX = event.clientX - dragStateRef.current.startX;
    track.scrollLeft = dragStateRef.current.startScrollLeft - deltaX;
  }

  function endPointerDrag(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !dragStateRef.current.active) return;

    dragStateRef.current.active = false;
    setIsDragging(false);

    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }

    scrollToPhoto(getNearestPhotoIndex());
  }

  return (
    <Section
      id="outside-tech"
      spacing="compact"
      aria-labelledby="outside-tech-heading"
      className="scroll-mt-24 border-t border-border/70"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-12">
        <div>
          <SectionHeader
            id="outside-tech-heading"
            eyebrow="Outside the Tech"
            title="Life beyond the screen"
            description="Outside of software, I spend my time cooking, training at the gym, exploring new places, fishing, trying good food, and making memories with my girlfriend and friends."
          />
          <p className="mt-4 max-w-xl text-small text-text-muted">
            A few snapshots from the people, places, food, and experiences that make up life outside the projects and code.
          </p>
        </div>

        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-metadata text-text-muted" aria-live="polite">
              Photo {activeIndex + 1} of {outsideTechPhotos.length}
            </p>
            <p className="hidden text-metadata text-text-muted sm:block">
              Swipe or drag to explore
            </p>
          </div>

          <div className="group relative">
            <div
              ref={trackRef}
              onScroll={handleScroll}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={endPointerDrag}
              onPointerCancel={endPointerDrag}
              tabIndex={0}
              role="region"
              aria-label="Outside the Tech photo gallery"
              className={`no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto rounded-2xl border border-border bg-surface-2 px-3 py-3 scroll-smooth select-none sm:gap-4 sm:px-4 sm:py-4 ${isDragging ? "cursor-grabbing snap-none" : "cursor-grab"}`}
            >
            {outsideTechPhotos.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[4/3] w-[90%] shrink-0 snap-center overflow-hidden rounded-xl sm:w-[92%]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading="lazy"
                  draggable={false}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="pointer-events-none object-cover"
                />
              </div>
            ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToPhoto(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Show previous Outside the Tech photo"
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white opacity-100 backdrop-blur-sm transition-all hover:bg-black/55 focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100 disabled:pointer-events-none disabled:opacity-0"
            >
              <ChevronIcon direction="left" />
            </button>

            <button
              type="button"
              onClick={() => scrollToPhoto(activeIndex + 1)}
              disabled={activeIndex === outsideTechPhotos.length - 1}
              aria-label="Show next Outside the Tech photo"
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white opacity-100 backdrop-blur-sm transition-all hover:bg-black/55 focus-visible:opacity-100 md:opacity-0 md:group-hover:opacity-100 disabled:pointer-events-none disabled:opacity-0"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-1" aria-label="Choose a gallery photo">
            {outsideTechPhotos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => scrollToPhoto(index)}
                aria-label={`Show photo ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-surface focus-visible:bg-surface"
              >
                <span
                  aria-hidden="true"
                  className={`h-2 rounded-full transition-all ${
                    activeIndex === index ? "w-6 bg-accent" : "w-2 bg-border"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
