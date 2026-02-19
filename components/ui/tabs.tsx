"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "relative inline-flex h-10 items-center justify-center rounded-xl bg-gray-100 p-1 text-gray-600 dark:bg-gray-900/50 dark:text-gray-400 border border-gray-200 dark:border-green-900/30",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const [isActive, setIsActive] = React.useState(false)
  const internalRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    const element = internalRef.current
    if (!element) return

    const observer = new MutationObserver(() => {
      setIsActive(element.getAttribute('data-state') === 'active')
    })

    observer.observe(element, {
      attributes: true,
      attributeFilter: ['data-state'],
    })

    // Initial check
    setIsActive(element.getAttribute('data-state') === 'active')

    return () => observer.disconnect()
  }, [])

  React.useImperativeHandle(ref, () => internalRef.current!)

  return (
    <TabsPrimitive.Trigger
      ref={internalRef}
      className={cn(
        "relative inline-flex items-center justify-center whitespace-nowrap rounded-lg px-6 py-2 text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:text-gray-900 dark:data-[state=active]:text-white",
        "hover:text-gray-900 dark:hover:text-gray-200",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 rounded-lg bg-white dark:bg-green-600 shadow-md dark:shadow-green-500/20"
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      )}
    </TabsPrimitive.Trigger>
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

const TabsContents = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("", className)}
    {...props}
  />
))
TabsContents.displayName = "TabsContents"

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsContents }
