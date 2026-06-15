import { cn } from "@/lib/utils/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-2xl border border-[#D4A853]/20 bg-white shadow-sm", className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: CardProps) {
  return <div className={cn("flex flex-col gap-1.5 p-5 pb-3", className)} {...props} />;
}

export function CardTitle({ className, ...props }: CardProps) {
  return <h3 className={cn("font-display text-lg font-semibold text-[#2D2013]", className)} {...props} />;
}

export function CardDescription({ className, ...props }: CardProps) {
  return <p className={cn("text-sm text-[#8B7355]", className)} {...props} />;
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn("p-5 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: CardProps) {
  return <div className={cn("flex items-center p-5 pt-0", className)} {...props} />;
}
