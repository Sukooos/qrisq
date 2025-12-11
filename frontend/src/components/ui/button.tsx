'use client';

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'glow' | 'outline' | 'ghost';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", isLoading, children, ...props }, ref) => {

        // Base styles
        const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-quantum-400 disabled:pointer-events-none disabled:opacity-50"

        // Varianst
        const variants = {
            default: "bg-quantum-600 text-white hover:bg-quantum-700 shadow-lg shadow-quantum-900/20",
            glow: "bg-quantum-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.5)] hover:bg-quantum-400 hover:shadow-[0_0_30px_rgba(14,165,233,0.7)] border border-quantum-400/50",
            outline: "border border-quantum-600 bg-transparent hover:bg-quantum-900/20 text-quantum-300",
            ghost: "hover:bg-quantum-900/10 text-quantum-300 hover:text-quantum-100",
        }

        const sizes = {
            default: "h-10 px-4 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-12 rounded-md px-8 text-lg",
            icon: "h-10 w-10",
        }

        return (
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                disabled={isLoading || props.disabled}
                {...(props as any)}
            >
                {isLoading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : null}
                {children}
            </motion.button>
        )
    }
)
Button.displayName = "Button"

export { Button }
