import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number | string
  change?: number
  icon: LucideIcon
  trend: 'up' | 'down' | 'neutral'
}

const StatCard = ({ title, value, change, icon: Icon, trend }: StatCardProps) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-success-500" />
              ) : trend === 'down' ? (
                <TrendingDown className="w-4 h-4 text-danger-500" />
              ) : null}
              <span
                className={`ml-1 text-sm font-medium ${
                  trend === 'up' ? 'text-success-600' : 
                  trend === 'down' ? 'text-danger-600' : 
                  'text-gray-600'
                }`}
              >
                {change > 0 ? '+' : ''}{change}%
              </span>
            </div>
          )}
        </div>
        <div className="p-3 bg-primary-50 rounded-lg">
          <Icon className="w-6 h-6 text-primary-600" />
        </div>
      </div>
    </div>
  )
}

export default StatCard 