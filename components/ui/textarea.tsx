import * as React from "react";

import { cn } from "@/lib/utilities";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex h-20 w-full rounded-md border border-slate-300 bg-white dark:bg-dark-800 py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none  disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 ",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
