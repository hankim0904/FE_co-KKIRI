import styled from "styled-components";
import DESIGN_TOKEN from "@/styles/tokens";
import { QUILL_ICONS } from "@/constants/reactQuillIcons";
import { Quill } from "react-quill";

const { color, mediaQueries } = DESIGN_TOKEN;

const icons = Quill.import("ui/icons");
icons["header"]["1"] = `<svg class="fm_editor_icon"><use href=${QUILL_ICONS.header1.src} /></svg>`;
icons["header"]["2"] = `<svg class="fm_editor_icon"><use href=${QUILL_ICONS.header2.src} /></svg>`;
icons["header"]["3"] = `<svg class="fm_editor_icon"><use href=${QUILL_ICONS.header3.src} /></svg>`;
icons["blockquote"] = `<svg class="fm_editor_icon"><use href=${QUILL_ICONS.header1.src} /></svg>`;
icons["bold"] = `<svg class="fm_editor_icon"><use href=${QUILL_ICONS.bold.src} /></svg>`;
icons["italic"] = `<svg class="fm_editor_icon"><use href=${QUILL_ICONS.italic.src} /></svg>`;
icons["underline"] = `<svg class="fm_editor_icon"><use href=${QUILL_ICONS.underline.src} /></svg>`;
icons["image"] = `<svg class="fm_editor_icon"><use href=${QUILL_ICONS.image.src} /></svg>`;
icons["link"] = `<svg class="fm_editor_icon"><use href=${QUILL_ICONS.link.src} /></svg>`;

export default function CustomToolbar() {
  return (
    <ToolbarContainer>
      <div id="toolbar">
        <HeaderContainer>
          <button className="ql-header" value="1"></button>
          <button className="ql-header" value="2"></button>
          <button className="ql-header" value="3"></button>
          <button className="ql-blockquote" />
        </HeaderContainer>
        <TextStyleContainer>
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <select className="ql-color" />
          <select className="ql-background" />
        </TextStyleContainer>
        <AlignmentContainer>
          <button className="ql-align" value=""></button>
          <button className="ql-align" value="center"></button>
          <button className="ql-align" value="right"></button>
        </AlignmentContainer>
        <ListContainer>
          <button className="ql-list" value="ordered"></button>
          <button className="ql-list" value="bullet"></button>
        </ListContainer>
        <SourceContainer>
          <button className="ql-link" />
          <button className="ql-image" />
        </SourceContainer>
      </div>
    </ToolbarContainer>
  );
}

const ToolbarContainer = styled.div`
  #toolbar {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 2rem;
    width: 100%;
    height: auto;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    border-bottom: none;
    background-color: ${color.gray[3]};
    border: 0.1rem solid ${color.gray[2]};
    padding: 1.5rem 2rem;

    & button {
      font-size: 14px;
      padding: 0 !important;
      width: 1.8rem;
    }

    ${mediaQueries.tablet} {
      gap: 0;
    }

    ${mediaQueries.mobile} {
      display: flex;
      flex-wrap: wrap;
      height: 8.3rem;
      gap: 0.8rem;
    }
  }
`;

const HeaderContainer = styled.span`
  & .ql-header {
    margin-right: 0.8rem;
  }

  ${mediaQueries.tablet} {
    & .ql-blockquote {
      margin-right: 0.8rem;
    }
  }
`;

const TextStyleContainer = styled.span`
  & button {
    margin-right: 0.8rem;
  }
`;

const AlignmentContainer = styled.span`
  & button:not(:last-child) {
    margin-right: 0.8rem;
  }

  ${mediaQueries.tablet} {
    margin-left: 0.6rem;

    & button:nth-last-child(1) {
      margin-right: 0.8rem;
    }
  }
`;

const ListContainer = styled.span`
  & button:not(:last-child) {
    margin-right: 0.8rem;
  }

  ${mediaQueries.tablet} {
    & button:nth-last-child(1) {
      margin-right: 0.8rem;
    }
  }
`;

const SourceContainer = styled.span`
  & button:not(:last-child) {
    margin-right: 0.8rem;
  }
`;
