import DefaultChip from "./DefaultChip";

interface PositionChipProps {
  label: string;
  className?: string;
}

export default function PositionChip({ label, className }: PositionChipProps) {
  return label && <DefaultChip label={label} className={className} />;
}
