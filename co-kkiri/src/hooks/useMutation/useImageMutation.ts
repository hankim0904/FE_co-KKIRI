import { getImageUploadUrl, postImage } from "@/lib/api/image";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useToast } from "../useToast";
import compressImage, { ImageOptionType } from "@/utils/compressImage";

export const useImageMutation = () => {
  const pushToast = useToast();

  const { mutateAsync: postImageMutate } = useMutation({
    mutationFn: ({ uploadURL, image }: { uploadURL: URL; image: File }) => postImage(uploadURL, image),
    onSuccess: () => {
      pushToast("이미지가 성공적으로 업로드되었습니다.", "success");
    },
    onError: (error) => {
      pushToast("이미지 업로드에 실패했습니다.", "error");
    },
  });

  const uploadImage = useCallback(
    async (image: File, type: ImageOptionType = "profile") => {
      const response = await getImageUploadUrl();

      const convertedImg = await compressImage(image, type);

      if (!response.uploadURL) {
        pushToast("이미지 업로드에 실패했습니다", "error"); // URL을 가져오지 못한 경우, 여기서 중단합니다.
      }

      const uploadURL = new URL(response.uploadURL);

      const mutateResponse = await postImageMutate({ uploadURL, image: convertedImg });

      if (!mutateResponse.ok) {
        return;
      }

      return uploadURL.origin + uploadURL.pathname;
    },
    [postImageMutate, pushToast],
  );

  return uploadImage;
};
