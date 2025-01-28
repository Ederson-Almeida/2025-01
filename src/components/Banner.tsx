"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const bannerImages = [
  "https://assets-portal-cms.olx.com.br/1576x300_Banner_da_Home_f93da65cf7.webp",
  "https://assets-portal-cms.olx.com.br/1576x300_d94f428d70.webp",
  "https://assets-portal-cms.olx.com.br/1576x300_VISIBILIDADE_af68ffebc6.webp",
];

export default function Banner() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 5000); // Muda a imagem a cada 5 segundos

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      {bannerImages.map((image, index) => (
        <div
          key={image}
          className={`absolute w-full h-full transition-opacity duration-500 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={`Banner ${index + 1}`}
            fill
            style={{ objectFit: "cover" }}
            priority={index === 0}
          />
        </div>
      ))}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentImage ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
}
