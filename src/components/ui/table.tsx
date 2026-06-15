import { forwardRef } from "react";
import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  function Table({ className, ...props }, ref) {
    return (
      <div className="w-full overflow-x-auto">
        <table
          ref={ref}
          className={cn("w-full caption-bottom text-sm", className)}
          {...props}
        />
      </div>
    );
  },
);

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableHeader({ className, ...props }, ref) {
    return (
      <thead
        ref={ref}
        className={cn(
          "border-b border-[#D4A853]/20 bg-[#FDF8F3] text-left text-xs uppercase tracking-wider text-[#8B7355]",
          className,
        )}
        {...props}
      />
    );
  },
);

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  function TableBody({ className, ...props }, ref) {
    return <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
  },
);

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  function TableRow({ className, ...props }, ref) {
    return (
      <tr
        ref={ref}
        className={cn(
          "border-b border-[#D4A853]/10 transition-colors hover:bg-[#FDF8F3]/60",
          className,
        )}
        {...props}
      />
    );
  },
);

export const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
  function TableHead({ className, ...props }, ref) {
    return <th ref={ref} className={cn("px-4 py-3 font-semibold", className)} {...props} />;
  },
);

export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  function TableCell({ className, ...props }, ref) {
    return <td ref={ref} className={cn("px-4 py-3 align-middle", className)} {...props} />;
  },
);
