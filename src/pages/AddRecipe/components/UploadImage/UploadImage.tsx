import "./UploadImage.scss";
import { ChangeEvent, useState } from "react";
import CameraIcon from "../../../../img/camera-solid.svg?react";
import bem from "../../../../common/bem";
const MAX_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const uploadImage = "upload-image";
const uploadImageClassNames = bem(uploadImage);
const labelClassNames = bem(`${uploadImage}__label`);

type UploadImageProps = {
  onImageSelect?: (imageFile: { file: File; dataUrl: string }) => void;
  maxSizeMB?: number;
  acceptedTypes?: string[];
  className?: string;
};

export default function UploadImage({
  onImageSelect,
  maxSizeMB = MAX_SIZE_MB,
  acceptedTypes = ACCEPTED_TYPES,
  className,
}: UploadImageProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) return;

    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPEG, PNG, or WebP)");
      return;
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      onImageSelect?.({ file, dataUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={uploadImageClassNames.mix(className)}>
      <input
        type="file"
        accept={acceptedTypes.join(",")}
        onChange={handleImageChange}
        className={uploadImageClassNames("input")}
        id="image-upload"
      />

      <label
        htmlFor="image-upload"
        className={labelClassNames({ "has-image": Boolean(preview) })}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className={labelClassNames("preview")}
          />
        ) : (
          <CameraIcon className={labelClassNames("icon")} />
        )}
      </label>

      {error && <p className={uploadImageClassNames("error")}>{error}</p>}
    </div>
  );
}
