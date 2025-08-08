import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}
import { 
  Download, 
  FileText, 
  BarChart3, 
  TrendingUp,
  Users,
  DollarSign,
  Calendar
} from 'lucide-react'

interface AnalyticsData {
  revenueData: any[]
  planPerformanceData: any[]
  userGrowthData: any[]
  topPlansData: any[]
  metrics: any[]
}

interface PDFExporterProps {
  data: AnalyticsData
  timeRange: string
  onExport: () => void
  isExporting?: boolean
}

const PDFExporter = ({ data, timeRange, onExport, isExporting = false }: PDFExporterProps) => {
  const generatePDF = async () => {
    try {
      const doc = new jsPDF()
      
      // Add header
      doc.setFontSize(20)
      doc.setTextColor(59, 130, 246) // Primary blue
      doc.text('SAK Constructions - Analytics Report', 20, 20)
      
      doc.setFontSize(12)
      doc.setTextColor(107, 114, 128) // Gray
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 30)
      doc.text(`Time Range: ${timeRange}`, 20, 37)
      
      let yPosition = 50

      // Add metrics summary
      doc.setFontSize(16)
      doc.setTextColor(17, 24, 39) // Dark gray
      doc.text('Key Metrics', 20, yPosition)
      yPosition += 10

      doc.setFontSize(10)
      doc.setTextColor(75, 85, 99) // Medium gray
      
      const metricsPerRow = 2
      data.metrics.forEach((metric, index) => {
        const row = Math.floor(index / metricsPerRow)
        const col = index % metricsPerRow
        const x = 20 + (col * 90)
        const y = yPosition + (row * 15)
        
        doc.text(`${metric.title}: ${metric.value}`, x, y)
        doc.setFontSize(8)
        doc.setTextColor(156, 163, 175) // Light gray
        doc.text(`${metric.change > 0 ? '+' : ''}${metric.change}% from last period`, x, y + 5)
        doc.setFontSize(10)
        doc.setTextColor(75, 85, 99)
      })
      
      yPosition += 40

      // Add revenue data table
      doc.setFontSize(14)
      doc.setTextColor(17, 24, 39)
      doc.text('Revenue Overview', 20, yPosition)
      yPosition += 10

      const revenueTableData = data.revenueData.map(item => [
        item.month,
        `$${item.revenue.toLocaleString()}`,
        item.orders.toString()
      ])

      doc.autoTable({
        startY: yPosition,
        head: [['Month', 'Revenue', 'Orders']],
        body: revenueTableData,
        theme: 'grid',
        headStyles: {
          fillColor: [59, 130, 246],
          textColor: 255
        },
        styles: {
          fontSize: 10
        }
      })

      yPosition = (doc as any).lastAutoTable.finalY + 20

      // Add plan categories
      doc.setFontSize(14)
      doc.setTextColor(17, 24, 39)
      doc.text('Plan Categories Performance', 20, yPosition)
      yPosition += 10

      const planTableData = data.planPerformanceData.map(item => [
        item.name,
        `${item.value}%`,
        `${((item.value / 100) * 100).toFixed(1)}%`
      ])

      doc.autoTable({
        startY: yPosition,
        head: [['Category', 'Market Share', 'Performance']],
        body: planTableData,
        theme: 'grid',
        headStyles: {
          fillColor: [16, 185, 129], // Success green
          textColor: 255
        },
        styles: {
          fontSize: 10
        }
      })

      yPosition = (doc as any).lastAutoTable.finalY + 20

      // Add user growth data
      doc.setFontSize(14)
      doc.setTextColor(17, 24, 39)
      doc.text('User Growth', 20, yPosition)
      yPosition += 10

      const userTableData = data.userGrowthData.map(item => [
        item.month,
        item.users.toString(),
        item.newUsers.toString()
      ])

      doc.autoTable({
        startY: yPosition,
        head: [['Month', 'Total Users', 'New Users']],
        body: userTableData,
        theme: 'grid',
        headStyles: {
          fillColor: [245, 158, 11], // Warning orange
          textColor: 255
        },
        styles: {
          fontSize: 10
        }
      })

      yPosition = (doc as any).lastAutoTable.finalY + 20

      // Add top performing plans
      doc.setFontSize(14)
      doc.setTextColor(17, 24, 39)
      doc.text('Top Performing Plans', 20, yPosition)
      yPosition += 10

      const topPlansTableData = data.topPlansData.map((item, index) => [
        `#${index + 1}`,
        item.name,
        item.downloads.toString(),
        `$${item.revenue.toLocaleString()}`
      ])

      doc.autoTable({
        startY: yPosition,
        head: [['Rank', 'Plan Name', 'Downloads', 'Revenue']],
        body: topPlansTableData,
        theme: 'grid',
        headStyles: {
          fillColor: [239, 68, 68], // Danger red
          textColor: 255
        },
        styles: {
          fontSize: 9
        }
      })

      yPosition = (doc as any).lastAutoTable.finalY + 20

      // Add insights section
      doc.setFontSize(14)
      doc.setTextColor(17, 24, 39)
      doc.text('Key Insights', 20, yPosition)
      yPosition += 10

      doc.setFontSize(10)
      doc.setTextColor(75, 85, 99)
      
      const insights = [
        '• Revenue increased by 12.5% compared to last month',
        '• Active users grew by 15.2% this month',
        '• Residential plans are the most popular category',
        '• Top plan generated $46,800 in revenue',
        '• User engagement continues to improve'
      ]

      insights.forEach((insight, index) => {
        doc.text(insight, 20, yPosition + (index * 8))
      })

      yPosition += 50

      // Add footer
      doc.setFontSize(8)
      doc.setTextColor(156, 163, 175)
      doc.text('This report was generated automatically by SAK Admin Dashboard', 20, yPosition)
      doc.text('For questions or support, contact admin@sakconstructions.com', 20, yPosition + 5)

      // Save the PDF
      const fileName = `sak-analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.pdf`
      doc.save(fileName)
      
      onExport()
    } catch (error) {
      console.error('PDF generation failed:', error)
      throw error
    }
  }

  return (
    <button
      onClick={generatePDF}
      disabled={isExporting}
      className="btn btn-primary btn-md"
      data-pdf-exporter
    >
      {isExporting ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Generating PDF...
        </div>
      ) : (
        <div className="flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </div>
      )}
    </button>
  )
}

export default PDFExporter 