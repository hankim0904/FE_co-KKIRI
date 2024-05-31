import { Helmet } from "react-helmet-async";

interface MetaTag {
  title: string;
}

export default function MetaTag({ title }: MetaTag) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
