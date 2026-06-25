export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const galleryData = {
  heading: "Gallery",
  images: [
    {
      id: "speaker_1",
      src: "/images/gallery/speaker_1.jpg",
      alt: "Speaker addressing the audience at Jigisha Jana Ojana",
      width: 1024,
      height: 684,
    },
    {
      id: "poster_screen",
      src: "/images/gallery/poster_screen.jpg",
      alt: "Jigisha presents Jana Ojana poster screen",
      width: 1024,
      height: 684,
    },
    {
      id: "seminar_hall",
      src: "/images/gallery/seminar_hall.jpg",
      alt: "A packed seminar hall with students and participants at UEM Kolkata",
      width: 1024,
      height: 684,
    },
    {
      id: "neon_sign",
      src: "/images/gallery/neon_sign.png",
      alt: "Bright purple neon sign showing #Jigisha",
      width: 1024,
      height: 707,
    },
    {
      id: "speaker_2",
      src: "/images/gallery/speaker_2.jpg",
      alt: "Inspirational speech by guest speaker in blue shirt at UEM Kolkata",
      width: 819,
      height: 1024,
    },
  ] as GalleryImage[],
};
