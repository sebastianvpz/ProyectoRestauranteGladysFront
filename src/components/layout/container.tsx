import { cn } from "@/lib/utils/cn";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg";
};

const SIZE = {
  sm: "max-w-4xl",
  md: "max-w-6xl",
  lg: "max-w-7xl",
};

export function Container({ size = "lg", className, ...props }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6", SIZE[size], className)} {...props} />
  );
}
