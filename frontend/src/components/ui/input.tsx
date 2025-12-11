import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <input
                className={cn(
                    "flex h-10 w-full rounded-md border border-quantum-800 bg-gray-950/50 px-3 py-2 text-sm ring-offset-gray-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-quantum-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-quantum-50 shadow-inner",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Input.displayName = "Input"

export { Input }
