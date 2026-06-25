import { cn } from "@/lib/utils";
import { Status } from "@/types";

type Props = {
  status: Status;
};
const Badge = ({ status }: Props) => {
  const statusStyles = {
    wishlist: "bg-muted/20 text-muted",
    applied: "bg-accent/20 text-accent",
    interview: "bg-warning/20 text-warning",
    offer: "bg-success/20 text-success",
    rejected: "bg-danger/20 text-danger",
  };

  return (
    <span
      className={cn(
        "px-3 py-1 rounded-full text-sm font-medium capitalize",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
};

export default Badge;
