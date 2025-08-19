import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-primary-50">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onCollapsed={setSidebarCollapsed} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          breadcrumbs={[]}
          notifications={[]}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-primary-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout 