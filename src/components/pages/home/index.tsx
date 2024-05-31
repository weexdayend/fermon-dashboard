'use client'

import React, { useRef } from 'react'

import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

import CardInfo from './card-info'
import CardHeader from './card-header'
import CardAchievement from './card-achievement'
import CardPerformance from './card-performance'
import { Button } from '@/components/ui/button'

type Props = {}

function Index({}: Props) {
  const printRef = useRef<HTMLDivElement>(null)

  const handleExportPdf = async () => {
    const input = printRef.current
    if (input) {
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const sections = input.querySelectorAll('section')
      const margin = 10 // Set your desired margin here

      let yOffset = margin
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const canvas = await html2canvas(section)
        const imgData = canvas.toDataURL('image/png')
        const imgProps = pdf.getImageProperties(imgData)
        const ratio = imgProps.width / imgProps.height
        const imgHeight = (pdfWidth - margin * 2) / ratio

        if (yOffset + imgHeight > pdfHeight - margin) {
          pdf.addPage()
          yOffset = margin
        }

        pdf.addImage(imgData, 'PNG', margin, yOffset, pdfWidth - margin * 2, imgHeight)
        yOffset += imgHeight
      }

      pdf.save('download.pdf')
    }
  }

  return (
    <>
      <div className='flex flex-col gap-8' ref={printRef}>
        <CardHeader />
        <Button onClick={handleExportPdf} variant={'outline'}>Export to PDF</Button>
        <section>
          <CardInfo />
        </section>
        <section>
          <CardAchievement />
        </section>
        <section>
          <CardPerformance />
        </section>
      </div>
    </>
  )
}

export default Index