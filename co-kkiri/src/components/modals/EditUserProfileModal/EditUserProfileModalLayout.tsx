import { useForm } from "react-hook-form";
import { useUserInfoStore } from "@/stores/userInfoStore";
import { UserInfoApiResponseDto, UserInfoEditApiRequestDto } from "@/lib/api/myPage/type";
import EditUserProfileModalForm from "./EditUserProfileModalForm";
import { useState } from "react";
import { useImageMutation } from "@/hooks/useMutation/useImageMutation";

interface EditUserProfileModalLayoutProps {
  onSubmit: (data: UserInfoEditApiRequestDto) => void;
}

export default function EditUserProfileModalLayout({ onSubmit }: EditUserProfileModalLayoutProps) {
  const { userInfo } = useUserInfoStore();
  const [tempUserImage, setTempUserImage] = useState<File | null>(null);
  const uploadImage = useImageMutation();

  const { control, handleSubmit } = useForm<UserInfoEditApiRequestDto>({
    defaultValues: userInfo ?? {},
    mode: "onBlur",
  });

  const onSubmitHandler = async (data: UserInfoEditApiRequestDto) => {
    const { gauge, ...submitData } = { ...data } as UserInfoApiResponseDto;

    let imageUrl = userInfo?.profileImageUrl;

    if (tempUserImage) {
      imageUrl = await uploadImage(tempUserImage);
    }

    if (imageUrl) {
      submitData.profileImageUrl = imageUrl;
    }

    onSubmit(submitData);
  };

  const handleTempImageChange = (file: File) => {
    setTempUserImage(file);
  };

  return (
    <EditUserProfileModalForm
      onSubmit={handleSubmit(onSubmitHandler)}
      onTempImageChange={handleTempImageChange}
      control={control}
    />
  );
}
