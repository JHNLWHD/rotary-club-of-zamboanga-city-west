import { Menu as ChakraMenu } from "@chakra-ui/react"
import * as React from "react"

export interface MenuRootProps extends ChakraMenu.RootProps {}

export interface MenuTriggerProps extends ChakraMenu.TriggerProps {}

export interface MenuContentProps extends ChakraMenu.ContentProps {}

export interface MenuItemProps extends ChakraMenu.ItemProps {}

export const MenuRoot = React.forwardRef<HTMLDivElement, MenuRootProps>(
  function MenuRoot(props, _ref) {
    return <ChakraMenu.Root {...props} />
  },
)

export const MenuTrigger = React.forwardRef<HTMLButtonElement, MenuTriggerProps>(
  function MenuTrigger(props, ref) {
    return <ChakraMenu.Trigger ref={ref} {...props} />
  },
)

export const MenuContent = React.forwardRef<HTMLDivElement, MenuContentProps>(
  function MenuContent(props, ref) {
    return <ChakraMenu.Content ref={ref} {...props} />
  },
)

export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  function MenuItem(props, ref) {
    return <ChakraMenu.Item ref={ref} {...props} />
  },
)

// Convenience exports
export const Menu = {
  Root: MenuRoot,
  Trigger: MenuTrigger,
  Content: MenuContent,
  Item: MenuItem,
} 