'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { getServerAuthSession } from '@/servers/auth'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { RocketIcon } from "@radix-ui/react-icons"

import { sideLinks } from '@/types/types'

type TPageTitleProps = {
  listClasses?: string,
  activeClasses?: string,
  capitalizeLinks?: boolean
}

const PageTitle = async (
  {
    listClasses, 
    activeClasses, 
    capitalizeLinks
  }: TPageTitleProps) => {

  const paths = usePathname()
  const pathNames = paths.split('/').filter( path => path )
  const pathTitle = sideLinks.filter((link) => link.route === paths)[0].label
  const pathDesc = sideLinks.filter((link) => link.route === paths)[0].desc

  return (
    <div className='flex flex-col gap-2 pb-12'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home">Fermon</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {
            pathNames.map( (link, index) => {
                let href = `/${pathNames.slice(0, index + 1).join('/')}`
                let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
                let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
                return (
                  <React.Fragment key={index}>
                    <BreadcrumbItem className={itemClasses}>
                      <BreadcrumbLink href={href}>{itemLink}</BreadcrumbLink>
                    </BreadcrumbItem>
                    { pathNames.length !== index + 1 && <BreadcrumbSeparator /> }
                  </React.Fragment>
                )
            })
          }
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className='text-5xl font-bold'>{pathTitle}</h1>
      <Alert>
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>Informasi</AlertTitle>
        <AlertDescription>
          {pathDesc}
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default PageTitle