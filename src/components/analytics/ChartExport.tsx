import { Download, Image, FileText } from 'lucide-react'
import toast from 'react-hot-toast'

interface ChartExportProps {
  chartRef: React.RefObject<HTMLDivElement>
  chartName: string
  onExport?: () => void
}

const ChartExport = ({ chartRef, chartName, onExport }: ChartExportProps) => {
  const exportAsImage = async () => {
    if (!chartRef.current) return

    try {
      // Use html2canvas to capture the chart
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true
      })

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `${chartName}-${new Date().toISOString().split('T')[0]}.png`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
          
          toast.success(`${chartName} exported as image!`)
          onExport?.()
        }
      }, 'image/png')
    } catch (error) {
      console.error('Chart export failed:', error)
      toast.error('Failed to export chart')
    }
  }

  const exportAsCSV = () => {
    // This would export chart data as CSV
    // Implementation depends on the specific chart data structure
    toast.info('CSV export feature coming soon!')
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={exportAsImage}
        className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
        title="Export as image"
      >
        <Image className="w-4 h-4 mr-1" />
        PNG
      </button>
      <button
        onClick={exportAsCSV}
        className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
        title="Export as CSV"
      >
        <FileText className="w-4 h-4 mr-1" />
        CSV
      </button>
    </div>
  )
}

export default ChartExport 