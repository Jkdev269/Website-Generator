import { useState } from 'react';

export default function Gallery({
  title = "Our Gallery",
  images = [
    { url: "/placeholder/400/300", alt: "Gallery image 1", caption: "Caption 1" },
    { url: "/placeholder/400/300", alt: "Gallery image 2", caption: "Caption 2" },
    { url: "/placeholder/400/300", alt: "Gallery image 3", caption: "Caption 3" },
    { url: "/placeholder/400/300", alt: "Gallery image 4", caption: "Caption 4" },
    { url: "/placeholder/400/300", alt: "Gallery image 5", caption: "Caption 5" },
    { url: "/placeholder/400/300", alt: "Gallery image 6", caption: "Caption 6" }
  ],
  variant = "grid" // grid, masonry, slider
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (index) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Different layout variants
  const renderGalleryItems = () => {
    switch(variant) {
      case 'grid':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="cursor-pointer overflow-hidden rounded-lg" onClick={() => openLightbox(index)}>
                <img 
                  src={`/api${image.url}`} 
                  alt={image.alt} 
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
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
                  src={`/api${image.url}`} 
                  alt={image.alt}
                  className="w-full rounded-lg hover:opacity-90 transition-opacity" 
                />
                {image.caption && (
                  <p className="text-sm text-gray-600 mt-1">{image.caption}</p>
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
                    src={`/api${image.url}`} 
                    alt={image.alt} 
                    className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity"
                  />
                  {image.caption && (
                    <p className="text-sm text-gray-600 mt-1">{image.caption}</p>
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
        )}
        
        {renderGalleryItems()}
        
        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <button 
              className="absolute top-4 right-4 text-white text-xl focus:outline-none"
              onClick={closeLightbox}
            >
              ✕
            </button>
            
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl focus:outline-none"
              onClick={prevImage}
            >
              ‹
            </button>
            
            <img 
              src={`/api${images[selectedImage].url}`} 
              alt={images[selectedImage].alt} 
              className="max-h-screen max-w-full"
            />
            
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl focus:outline-none"
              onClick={nextImage}
            >
              ›
            </button>
            
            {images[selectedImage].caption && (
              <div className="absolute bottom-8 left-0 right-0 text-center text-white">
                {images[selectedImage].caption}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}