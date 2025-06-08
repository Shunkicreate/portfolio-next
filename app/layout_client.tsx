// app/layout_client.tsx
'use client'

import DynamicRootLayoutClient from './DynamicRootLayoutClient'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
	return <DynamicRootLayoutClient>{children}</DynamicRootLayoutClient>
}
