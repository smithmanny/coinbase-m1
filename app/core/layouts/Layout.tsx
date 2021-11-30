import { ReactNode, Suspense } from "react"
import { Head } from "blitz"

import Appbar from 'app/core/components/appbar'

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "CIME"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Appbar />
      <main>
        {children}
      </main>
    </>
  )
}

export default Layout
