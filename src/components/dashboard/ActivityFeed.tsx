import { formatDistanceToNow } from 'date-fns'
import { ShoppingCart, FileText, User } from 'lucide-react'

interface Activity {
  id: string
  type: 'order' | 'plan' | 'user'
  message: string
  timestamp: Date
  user: string
}

interface ActivityFeedProps {
  activities: Activity[]
  onLoadMore: () => void
  loading: boolean
}

const ActivityFeed = ({ activities, onLoadMore, loading }: ActivityFeedProps) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'order':
        return <ShoppingCart className="w-4 h-4 text-primary-600" />
      case 'plan':
        return <FileText className="w-4 h-4 text-success-600" />
      case 'user':
        return <User className="w-4 h-4 text-warning-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            {getActivityIcon(activity.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-900">{activity.message}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-gray-500">{activity.user}</span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      ))}
      
      {activities.length > 0 && (
        <button
          onClick={onLoadMore}
          disabled={loading}
          className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium py-2"
        >
          {loading ? 'Loading...' : 'Load more'}
        </button>
      )}
    </div>
  )
}

export default ActivityFeed 