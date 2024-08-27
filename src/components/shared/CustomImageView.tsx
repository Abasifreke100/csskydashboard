import { useState, useRef } from "react";
import { AiOutlineDownload } from "react-icons/ai"; // React Icons for download
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io"; // React Icons for rotate
import { FieldValue } from "../../types";

interface Field {
  value: FieldValue;
  label: string;
}

const CustomImageView = ({ field }: { field: Field }) => {
  const [rotation, setRotation] = useState(0);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const rotateImage = (angle: number) => {
    setRotation((prevRotation) => prevRotation + angle);
  };

  const downloadImage = () => {
    try {
      const imgUrl = field.value;
      if (!imgUrl) {
        console.error("Image URL is invalid");
        return;
      }

      const link = document.createElement("a");
      link.href = imgUrl as string;
      link.download = "image.jpg"; // Use appropriate file name and extension
      document.body.appendChild(link);
      //   link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="items-center justify-center flex flex-col overflow-hidden p-4">
      <div className="  border  w-full h-full relative overflow-hidden group rounded-md">
        <img
          ref={imgRef}
          src={field.value as string}
          alt={field.label}
          style={{ transform: `rotate(${rotation}deg)` }}
          className="w-full h-full object-center object-contain group-hover:scale-150 transition-transform duration-300 ease-in-out"
        />
      </div>
      <div className="flex flex-col md:flex-row  self-start md:space-x-2 mt-4">
        <button
          onClick={() => rotateImage(90)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md mb-2 md:mb-0"
        >
          <IoMdArrowRoundForward className="w-5 h-5 mr-2" />
          Rotate 90°
        </button>
        <button
          onClick={() => rotateImage(-90)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md mb-2 md:mb-0"
        >
          <IoMdArrowRoundBack className="w-5 h-5 mr-2" />
          Rotate -90°
        </button>
        <button
          onClick={downloadImage}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md"
        >
          <AiOutlineDownload className="w-5 h-5 mr-2" />
          Download Image
        </button>
      </div>
    </div>
  );
};

export default CustomImageView;
