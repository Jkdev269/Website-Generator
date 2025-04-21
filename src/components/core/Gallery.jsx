import { useState } from 'react';
import { useTheme } from '../../lib/context/ThemeContext';

export default function Gallery({
  title = "Our Gallery",
  images = [
    {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      alt: "Beautiful mountain view",
      caption: "Majestic Mountains"
    },
    {
      url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=400&q=80",
      alt: "Beach sunset",
      caption: "Golden Beach Sunset"
    },
    {
      url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
      alt: "City skyline at night",
      caption: "City Lights"
    },
    {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
      alt: "Ocean waves",
      caption: "Rolling Waves"
    },
    {
      url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
      alt: "Smiling woman",
      caption: "Portrait"
    },
    {
      url: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=400&q=80",
      alt: "Forest path",
      caption: "Misty Forest"
    }
  ],
  variant = "grid"
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const { palette } = useTheme();

  const openLightbox = (index) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

  const renderGalleryItems = () => {
    switch (variant) {
      case 'grid':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="cursor-pointer overflow-hidden rounded-lg"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={`${image.url}`}
                  alt={image.alt}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: palette.light }}
                />
              </div>
            ))}
          </div>
        );

      case 'masonry':
        return (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="cursor-pointer mb-4" onClick={() => openLightbox(index)}>
                <img
                  src={`${image.url}`}
                  alt={image.alt}
                  className="w-full rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: palette.light }}
                />
                {image.caption && (
                  <p className="text-sm mt-1" style={{ color: palette.secondary }}>
                    {image.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        );

      case 'slider':
        return (
          <div className="relative">
            <div className="overflow-x-auto pb-4 flex space-x-4 scrollbar-hide">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-64 cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={`${image.url}`}
                    alt={image.alt}
                    className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: palette.light }}
                  />
                  {image.caption && (
                    <p className="text-sm mt-1" style={{ color: palette.secondary }}>
                      {image.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-16" style={{ backgroundColor: palette.background }}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: palette.primary }}>
            {title}
          </h2>
        )}

        {renderGalleryItems()}

        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              backgroundColor: `${palette.dark}E6`, // ~90% dark overlay
            }}
          >
            <button
              className="absolute top-4 right-4 text-xl focus:outline-none"
              onClick={closeLightbox}
              style={{ color: palette.light }}
            >
              ✕
            </button>

            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl focus:outline-none"
              onClick={prevImage}
              style={{ color: palette.light }}
            >
              ‹
            </button>

            <img
              src={`${images[selectedImage].url}`}
              alt={images[selectedImage].alt}
              className="max-h-screen max-w-full rounded"
            />

            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl focus:outline-none"
              onClick={nextImage}
              style={{ color: palette.light }}
            >
              ›
            </button>

            {images[selectedImage].caption && (
              <div
                className="absolute bottom-8 left-0 right-0 text-center text-sm"
                style={{ color: palette.accent }}
              >
                {images[selectedImage].caption}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
