import DESIGN_TOKEN from "@/styles/tokens";
import { Image } from "@/types/imageTypes";
import { ChangeEvent, useRef } from "react";
import styled from "styled-components";
import { useToast } from "@/hooks/useToast";
import TOAST from "@/constants/toast";

interface FileSelectorProps {
  name: string;
  type: "file" | "image";
  isMultiple?: boolean;
  onChange: (file: File | FileList) => void;
  icon: Image;
  className?: string;
}

const { imageType } = TOAST;

export default function FileSelector({ name, type, isMultiple, onChange, icon, className }: FileSelectorProps) {
  const InputRef = useRef<HTMLInputElement>(null);
  const pushToast = useToast();
  const onClickHandler = () => {
    if (!InputRef.current) return;

    InputRef.current.click();
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

    if (!selectedFiles || selectedFiles.length === 0) return;

    const firstSelectedFile = selectedFiles[0];
    const fileType = firstSelectedFile.type;

    if (fileType.startsWith("image/") && fileType !== "image/gif") {
      const selectedFileValue = isMultiple ? selectedFiles : firstSelectedFile;
      onChange(selectedFileValue);
    } else {
      pushToast(imageType.message, imageType.type);
    }
  };

  return (
    <Container className={className} onClick={onClickHandler} type="button">
      <FileInput
        name={name}
        type="file"
        ref={InputRef}
        onChange={onChangeHandler}
        accept={type === "image" ? "image/*" : undefined}
      />
      <FileIcon src={icon.src} alt={icon.alt} />
    </Container>
  );
}

const { color } = DESIGN_TOKEN;

const Container = styled.button`
  width: 3.2rem;
  height: 3.2rem;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  border-radius: 9999rem;
  border: 0.1rem solid ${color.gray[2]};
  background-color: ${color.white};

  &:hover {
    cursor: pointer;
  }
`;

const FileIcon = styled.img`
  width: 1.8rem;
  height: 1.8rem;
`;

const FileInput = styled.input`
  display: none;
`;
