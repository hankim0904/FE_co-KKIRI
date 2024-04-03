import { ContactWayInfo } from "../types";
import { ICONS } from "@/constants/icons";
import { getEmailLink } from "@/utils/validationUtils";
import Link from "../../Link";
import { RowContent } from "../ProjectDetailRowContent";

interface ContactWayProps {
  content: ContactWayInfo;
}

export default function ContactWay({ content }: ContactWayProps) {
  if (!content.content) {
    return <RowContent>{content.label}</RowContent>;
  }

  switch (content.label) {
    case "기타": {
      return <RowContent>{content.label}</RowContent>;
    }
    case "카카오 오픈톡": {
      return <Link label={content.label} to={content.content || ""} icon={ICONS.link} linkType="external" />;
    }
    case "구글폼": {
      return <Link label={content.label} to={content.content || ""} icon={ICONS.link} linkType="external" />;
    }
    case "이메일": {
      return (
        <Link
          label={content.label}
          to={content.content ? getEmailLink(content.content) : ""}
          icon={ICONS.link}
          linkType="external"
        />
      );
    }
    default:
      return <RowContent></RowContent>;
  }
}
