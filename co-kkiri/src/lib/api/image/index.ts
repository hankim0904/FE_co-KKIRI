import { imageAddress } from "../address";
import { apiRequest } from "../axios";

import { ImageUploadApiResponseDto } from "./type";

/** 이미지 url 가져오기 */
export const getImageUploadUrl = (): Promise<ImageUploadApiResponseDto> => apiRequest("post", imageAddress);

/** 이미지 업로드하기 */
export const postImage = async (url: URL, image: File) => {
  console.log(url);

  const response = await fetch(url.href, {
    method: "PUT",
    body: image,
    headers: {
      "Content-Type": image.type,
    },
  });

  if (!response.ok) {
    throw new Error("이미지 업로드에 실패했습니다.");
  }

  return response;
};
