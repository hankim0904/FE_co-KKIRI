import { useEffect, useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "./CustomToolbar";
import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";
import { useImageMutation } from "@/hooks/useMutation/useImageMutation";

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "blockquote",
  "list",
  "link",
  "align",
  "color",
  "background",
  "image",
];

export default function QuillEditor({ onChange, value }: { onChange: (value: string) => void; value: string }) {
  const quillRef = useRef<ReactQuill | null>(null);
  const uploadImage = useImageMutation();

  useEffect(() => {
    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Tab" && quillRef.current) {
        event.preventDefault();
        const quillEditor = quillRef.current.getEditor();
        quillEditor.focus();
      }
    };

    document.addEventListener("keydown", handleTabKeyPress);

    return () => {
      document.removeEventListener("keydown", handleTabKeyPress);
    };
  }, []);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      if (input.files) {
        const file = input.files[0];

        const editor = quillRef.current?.getEditor();
        if (editor) {
          const range = editor.getSelection();
          if (range) {
            const result = await uploadImage(file);
            const IMG_URL = result;
            editor.insertEmbed(range.index, "image", IMG_URL);
          }
        }
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
        handlers: {
          image: imageHandler,
        },
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CustomToolbar />
      <ReactQuillWrapper>
        <ReactQuill
          ref={quillRef}
          value={value}
          theme="snow"
          modules={modules}
          formats={formats}
          onChange={onChange}
          className="custom-quill-editor"
          placeholder="프로젝트를 소개해주세요!"
        />
      </ReactQuillWrapper>
    </>
  );
}
const { color, typography, mediaQueries } = DESIGN_TOKEN;

const ReactQuillWrapper = styled.div`
  .ql-container {
    height: 75.2rem;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border: 0.1rem solid ${color.gray[2]};
    border-top: none;

    ${mediaQueries.mobile} {
      height: 39.7rem;
    }
  }

  .ql-editor.ql-blank::before {
    color: ${color.gray[1]};
    font-style: normal;
    ${typography.font16Semibold};
  }
`;
