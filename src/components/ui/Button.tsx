import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
const buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A962] disabled:opacity-50 active:scale-[0.985]", { variants: { variant: { default: "bg-[#C9A962] text-[#0F0F0F] hover:bg-[#D4AF37]", outline: "border border-[#C9A962] text-[#C9A962] hover:bg-[#C9A962] hover:text-[#0F0F0F]", ghost: "hover:bg-[#1C1C1C]", secondary: "bg-[#1C1C1C] text-white hover:bg-[#2A2A2A]" }, size: { default: "h-11 px-6", sm: "h-9 px-4 text-xs", lg: "h-14 px-8 text-base", icon: "h-11 w-11" } }, defaultVariants: { variant: "default", size: "default" } })
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />)
Button.displayName = "Button"
export { Button, buttonVariants }