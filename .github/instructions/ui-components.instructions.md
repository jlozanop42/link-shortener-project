---
description: Read this before creating or modifying any UI components. This file outlines the rules and guidelines for using shadcn/ui as the exclusive UI component library in this application.
---

# UI Components

## Overview
All UI elements in this app must use **shadcn/ui** components. Do not build custom UI components.

## Rules
- Use shadcn/ui for **every** UI element.
- Do **not** create custom components that replace shadcn/ui.
- Prefer existing shadcn/ui primitives and composable patterns.
- Check shadcn/ui docs before building anything new.

## Common Available Components
- Button, Input, Textarea
- Select, Checkbox, Switch, Radio Group
- Dialog, Drawer, Sheet, Popover, Tooltip
- Tabs, Accordion, Collapsible
- Alert, Badge, Card, Skeleton
- Table, Pagination
- Breadcrumb, Navigation Menu
- Dropdown Menu, Menubar, Context Menu
- Form, Calendar, Date Picker

## How to Install a Component
1. Check the shadcn/ui documentation to confirm the component exists.
2. Add it using the CLI:
	- npx shadcn-ui@latest add <component>
3. Use the generated component from the project components directory.

## Reference
- Check for existing components before building anything: https://ui.shadcn.com

## DO NOT
- ❌ Build custom buttons, inputs, modals, or layout components
- ❌ Add bespoke UI components outside shadcn/ui
- ❌ Introduce another UI component library

## Best Practices
- Compose shadcn/ui primitives to achieve layouts and interactions
- Keep UI consistent with existing shadcn/ui styling and patterns
