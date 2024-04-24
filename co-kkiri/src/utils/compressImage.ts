import imageCompression from "browser-image-compression";

export type ImageOptionType = "profile" | "editor";

const compressImage = async (imageFile: File, type: ImageOptionType = "profile") => {
  const options = {
    profile: { maxSizeMB: 0.5, maxWidthOrHeight: 250, useWebWorker: true, fileType: "image/webp" },
    editor: { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true, fileType: "image/webp" },
  };
  try {
    const compressedImage = await imageCompression(imageFile, options[type]);
    return compressedImage;
  } catch (e) {
    console.error(e);
    throw new Error("이미지 압축 실패");
  }
};

export default compressImage;
