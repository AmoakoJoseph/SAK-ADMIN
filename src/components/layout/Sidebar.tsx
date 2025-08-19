import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Upload,
  CheckCircle,
  TrendingUp,
  UserCheck,
  Shield,
  Mail,
  CreditCard
} from 'lucide-react'

interface SidebarProps {
  collapsed: boolean
  onCollapsed: (collapsed: boolean) => void
}

interface NavigationItem {
  name: string
  href: string
  icon: any
  permissions?: string[]
  subItems?: NavigationItem[]
}

const navigation: NavigationItem[] = [
  { 
    name: 'Dashboard', 
    href: '/', 
    icon: LayoutDashboard,
    permissions: ['dashboard:read']
  },
  { 
    name: 'Plans', 
    href: '/plans', 
    icon: FileText,
    permissions: ['plans:read'],
    subItems: [
      { name: 'All Plans', href: '/plans', icon: FileText },
      { name: 'Upload Plans', href: '/plans/upload', icon: Upload },
      { name: 'Pending Approval', href: '/plans/pending-approval', icon: CheckCircle },
      { name: 'Plan Analytics', href: '/plans/analytics', icon: TrendingUp },
    ]
  },
  { 
    name: 'Users', 
    href: '/users', 
    icon: Users,
    permissions: ['users:read'],
    subItems: [
      { name: 'All Users', href: '/users', icon: Users },
      { name: 'Pending Approval', href: '/users/pending-approval', icon: UserCheck },
      { name: 'User Analytics', href: '/users/analytics', icon: TrendingUp },
    ]
  },
  { 
    name: 'Orders', 
    href: '/orders', 
    icon: ShoppingCart,
    permissions: ['orders:read'],
    subItems: [
      { name: 'All Orders', href: '/orders', icon: ShoppingCart },
      { name: 'Pending Orders', href: '/orders/pending', icon: CheckCircle },
      { name: 'Refunds', href: '/orders/refunds', icon: CreditCard },
    ]
  },
  { 
    name: 'Analytics', 
    href: '/analytics', 
    icon: BarChart3,
    permissions: ['analytics:read'],
    subItems: [
      { name: 'Dashboard', href: '/analytics', icon: BarChart3 },
      { name: 'Sales Reports', href: '/reports/sales', icon: TrendingUp },
      { name: 'User Reports', href: '/reports/users', icon: Users },
      { name: 'Plan Reports', href: '/analytics', icon: FileText },
    ]
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Settings,
    permissions: ['settings:read'],
    subItems: [
      { name: 'Site Settings', href: '/settings', icon: Settings },
      { name: 'Payment Config', href: '/settings/payment', icon: CreditCard },
      { name: 'Email Templates', href: '/settings/email', icon: Mail },
      { name: 'Security', href: '/settings/security', icon: Shield },
    ]
  },
]

const Sidebar = ({ collapsed, onCollapsed }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  const renderNavItem = (item: NavigationItem, isSubItem = false) => {
    const hasSubItems = item.subItems && item.subItems.length > 0
    const isExpanded = expandedItems.includes(item.name)
    
    return (
      <div key={item.name}>
        <NavLink
          to={item.href}
          className={({ isActive }) =>
            `sidebar-item ${isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'} ${
              isSubItem ? 'ml-4' : ''
            }`
          }
          onClick={() => hasSubItems && !collapsed && toggleExpanded(item.name)}
        >
          <item.icon size={20} />
          {!collapsed && (
            <>
              <span className="ml-3">{item.name}</span>
              {hasSubItems && (
                <ChevronDown 
                  size={16} 
                  className={`ml-auto transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
              )}
            </>
          )}
        </NavLink>
        
        {/* Sub-items */}
        {hasSubItems && !collapsed && isExpanded && (
          <div className="ml-4 mt-1 space-y-1">
            {item.subItems!.map(subItem => renderNavItem(subItem, true))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`bg-white border-r border-brand-lightGray flex flex-col ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300`}>
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-brand-lightGray">
        {!collapsed && (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="ml-3 font-semibold text-brand-charcoal">SAK Admin</span>
          </div>
        )}
        <button
          onClick={() => onCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-primary-50 text-brand-charcoal"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => renderNavItem(item))}
      </nav>
    </div>
  )
}

export default Sidebar 