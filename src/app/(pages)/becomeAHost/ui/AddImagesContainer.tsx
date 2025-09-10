import { useState } from "react";
import Image from "next/image";

export default function AddImagesContainer() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Check if adding these files would exceed the limit
    if (selectedImages.length + files.length > 5) {
      alert("Please select maximum 5 images total");
      return;
    }

    setSelectedImages((prev) => [...prev, ...files]);

    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-3 border border-gray-100 shadow rounded">
      <h1 className="mb-3">Add 5 Images</h1>

      <div className="mb-4">
        <p className="text-sm text-gray-500">
          {selectedImages.length}/5 images selected
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Display selected images as cards */}
        {selectedImages.map((image, index) => (
          <div
            key={index}
            className="relative  rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <div className="aspect-square relative">
              <Image
                src={URL.createObjectURL(image)}
                fill
                alt={`Upload ${index + 1}`}
                className="object-cover"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-blue-100 hover:cursor-pointer shadow-md"
              >
                ×
              </button>
            </div>
          </div>
        ))}

        {/* Add image card - only show if less than 5 images */}
        {selectedImages.length < 5 && (
          <div className="relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
              id="imageInput"
              required
            />
            <label
              htmlFor="imageInput"
              className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg h-full cursor-pointer hover:border-gray-400 hover:bg-blue-50 transition-all duration-200 aspect-square"
            >
              <div className="text-4xl text-gray-400 mb-2">+</div>
              <p className="text-sm text-gray-500 text-center">Add Image</p>
              <p className="text-xs text-gray-400 text-center mt-1">
                {5 - selectedImages.length} remaining
              </p>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
