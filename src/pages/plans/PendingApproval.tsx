import { useState, useEffect } from 'react'
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Clock, 
  FileText, 
  User,
  Calendar,
  AlertCircle,
  Download,
  Filter
} from 'lucide-react'

interface PendingPlan {
  id: string
  title: string
  description: string
  category: string
  price: number
  uploadedBy: string
  uploadedAt: string
  status: 'pending' | 'reviewing' | 'approved' | 'rejected'
  files: string[]
  bedrooms: number
  bathrooms: number
  squareFootage: number
  features: string[]
  adminNotes?: string
}

const PendingApproval = () => {
  const [pendingPlans, setPendingPlans] = useState<PendingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlans, setSelectedPlans] = useState<string[]>([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  useEffect(() => {
    fetchPendingPlans()
  }, [])

  const fetchPendingPlans = async () => {
    try {
      setLoading(true)
      // Mock data - replace with real API calls
      const mockPlans: PendingPlan[] = [
        {
          id: '1',
          title: 'Modern Villa Design',
          description: 'Contemporary 4-bedroom villa with open concept living',
          category: 'Residential',
          price: 2500,
          uploadedBy: 'John Doe',
          uploadedAt: '2024-01-15T10:30:00Z',
          status: 'pending',
          files: ['villa1.jpg', 'villa2.jpg', 'villa_plans.pdf'],
          bedrooms: 4,
          bathrooms: 3,
          squareFootage: 2800,
          features: ['Open Kitchen', 'Garden', 'Balcony', 'Garage']
        },
        {
          id: '2',
          title: 'Commercial Office Complex',
          description: 'Modern office building with sustainable design',
          category: 'Commercial',
          price: 5000,
          uploadedBy: 'Jane Smith',
          uploadedAt: '2024-01-14T14:20:00Z',
          status: 'reviewing',
          files: ['office1.jpg', 'office_plans.pdf', 'office_specs.pdf'],
          bedrooms: 0,
          bathrooms: 8,
          squareFootage: 5000,
          features: ['Open Floor Plan', 'Conference Rooms', 'Parking', 'Elevator']
        },
        {
          id: '3',
          title: 'Sustainable Home',
          description: 'Eco-friendly residential design with solar integration',
          category: 'Residential',
          price: 3500,
          uploadedBy: 'Bob Wilson',
          uploadedAt: '2024-01-13T09:15:00Z',
          status: 'pending',
          files: ['eco1.jpg', 'eco_plans.pdf'],
          bedrooms: 3,
          bathrooms: 2,
          squareFootage: 2200,
          features: ['Solar Panels', 'Rainwater Collection', 'Natural Ventilation']
        },
        {
          id: '4',
          title: 'Landscape Garden Design',
          description: 'Beautiful garden design with water features',
          category: 'Landscape',
          price: 1200,
          uploadedBy: 'Alice Brown',
          uploadedAt: '2024-01-12T16:45:00Z',
          status: 'reviewing',
          files: ['garden1.jpg', 'garden2.jpg', 'garden_plans.pdf'],
          bedrooms: 0,
          bathrooms: 0,
          squareFootage: 1500,
          features: ['Water Fountain', 'Pergola', 'Flower Beds', 'Pathways']
        }
      ]
      setPendingPlans(mockPlans)
    } catch (error) {
      console.error('Error fetching pending plans:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning-100 text-warning-800'
      case 'reviewing':
        return 'bg-blue-100 text-blue-800'
      case 'approved':
        return 'bg-success-100 text-success-800'
      case 'rejected':
        return 'bg-danger-100 text-danger-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} />
      case 'reviewing':
        return <AlertCircle size={16} />
      case 'approved':
        return <CheckCircle size={16} />
      case 'rejected':
        return <XCircle size={16} />
      default:
        return <Clock size={16} />
    }
  }

  const handleBulkAction = (action: 'approve' | 'reject') => {
    if (selectedPlans.length === 0) return
    
    const actionText = action === 'approve' ? 'approve' : 'reject'
    if (confirm(`Are you sure you want to ${actionText} ${selectedPlans.length} selected plan(s)?`)) {
      // In real app, call API to update status
      console.log(`Bulk ${action} for plans:`, selectedPlans)
      setSelectedPlans([])
    }
  }

  const handleStatusChange = (planId: string, newStatus: 'approved' | 'rejected') => {
    setPendingPlans(prev => 
      prev.map(plan => 
        plan.id === planId 
          ? { ...plan, status: newStatus }
          : plan
      )
    )
  }

  const filteredPlans = pendingPlans.filter(plan => {
    const matchesStatus = filterStatus === 'all' || plan.status === filterStatus
    const matchesCategory = filterCategory === 'all' || plan.category === filterCategory
    return matchesStatus && matchesCategory
  })

  const pendingCount = pendingPlans.filter(p => p.status === 'pending').length
  const reviewingCount = pendingPlans.filter(p => p.status === 'reviewing').length
  const totalPending = pendingPlans.length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-charcoal">Pending Approval</h1>
          <p className="text-brand-lightGray">Review and approve uploaded building plans</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center">
            <div className="p-3 bg-warning-50 rounded-lg">
              <Clock size={24} className="text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-brand-lightGray">Pending Review</p>
              <p className="text-2xl font-bold text-brand-charcoal">{pendingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <AlertCircle size={24} className="text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-brand-lightGray">Under Review</p>
              <p className="text-2xl font-bold text-brand-charcoal">{reviewingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center">
            <div className="p-3 bg-primary-50 rounded-lg">
              <FileText size={24} className="text-brand-orange" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-brand-lightGray">Total Pending</p>
              <p className="text-2xl font-bold text-brand-charcoal">{totalPending}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Bulk Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewing">Reviewing</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Landscape">Landscape</option>
            </select>
          </div>
          
          {selectedPlans.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('approve')}
                className="btn btn-success flex items-center space-x-2"
              >
                <CheckCircle size={16} />
                <span>Approve Selected ({selectedPlans.length})</span>
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="btn btn-danger flex items-center space-x-2"
              >
                <XCircle size={16} />
                <span>Reject Selected ({selectedPlans.length})</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Plans Table */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-lightGray">
            <thead className="bg-primary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPlans(filteredPlans.map(p => p.id))
                      } else {
                        setSelectedPlans([])
                      }
                    }}
                    checked={selectedPlans.length === filteredPlans.length && filteredPlans.length > 0}
                    className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Uploaded By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-brand-lightGray">
              {filteredPlans.map((plan) => (
                <tr key={plan.id} className="hover:bg-primary-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedPlans.includes(plan.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPlans(prev => [...prev, plan.id])
                        } else {
                          setSelectedPlans(prev => prev.filter(id => id !== plan.id))
                        }
                      }}
                      className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
                          <FileText size={24} className="text-brand-orange" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-brand-charcoal">{plan.title}</div>
                        <div className="text-sm text-brand-lightGray">{plan.description}</div>
                        <div className="text-xs text-brand-lightGray">
                          {plan.bedrooms} beds • {plan.bathrooms} baths • {plan.squareFootage} sq ft
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {plan.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-charcoal">
                    ${plan.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                      {getStatusIcon(plan.status)}
                      <span className="ml-1 capitalize">{plan.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-charcoal">
                    <div className="flex items-center">
                      <User size={16} className="mr-2 text-brand-lightGray" />
                      {plan.uploadedBy}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-lightGray">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      {new Date(plan.uploadedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-brand-orange hover:text-primary-600" title="View plan">
                        <Eye size={16} />
                      </button>
                      <button className="text-success-600 hover:text-success-800" title="Approve plan">
                        <CheckCircle size={16} />
                      </button>
                      <button className="text-danger-600 hover:text-danger-800" title="Reject plan">
                        <XCircle size={16} />
                      </button>
                      <button className="text-brand-charcoal hover:text-primary-600" title="Download files">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredPlans.length === 0 && (
        <div className="text-center py-12">
          <FileText size={48} className="text-brand-lightGray mx-auto mb-4" />
          <h3 className="text-lg font-medium text-brand-charcoal mb-2">No plans found</h3>
          <p className="text-brand-lightGray mb-4">
            {filterStatus !== 'all' || filterCategory !== 'all' 
              ? 'Try adjusting your filters'
              : 'No plans are currently pending approval'
            }
          </p>
        </div>
      )}
    </div>
  )
}

export default PendingApproval
