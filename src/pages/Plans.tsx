import { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Edit, 
  Trash2, 
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  FileText
} from 'lucide-react'
import { adminPlansService, Plan } from '../services/admin/adminPlans'

const Plans = () => {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      setLoading(true)
      // For now, using mock data until API is ready
      const mockPlans: Plan[] = [
        {
          id: '1',
          title: 'Modern Villa Design',
          description: 'Contemporary 4-bedroom villa with open concept living',
          price: 2500,
          category: 'Residential',
          status: 'approved',
          images: ['villa1.jpg', 'villa2.jpg'],
          features: ['4 Bedrooms', '3 Bathrooms', 'Open Kitchen', 'Garden'],
          squareFootage: 2800,
          bedrooms: 4,
          bathrooms: 3,
          createdAt: '2024-01-15',
          updatedAt: '2024-01-15',
          uploadedBy: 'John Doe',
          approvalDate: '2024-01-16',
          approvedBy: 'Admin'
        },
        {
          id: '2',
          title: 'Commercial Office Complex',
          description: 'Modern office building with sustainable design',
          price: 5000,
          category: 'Commercial',
          status: 'pending',
          images: ['office1.jpg'],
          features: ['Open Floor Plan', 'Conference Rooms', 'Parking'],
          squareFootage: 5000,
          bedrooms: 0,
          bathrooms: 8,
          createdAt: '2024-01-14',
          updatedAt: '2024-01-14',
          uploadedBy: 'Jane Smith'
        }
      ]
      setPlans(mockPlans)
    } catch (error) {
      console.error('Error fetching plans:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-success-100 text-success-800'
      case 'pending':
        return 'bg-warning-100 text-warning-800'
      case 'rejected':
        return 'bg-danger-100 text-danger-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} />
      case 'pending':
        return <Clock size={16} />
      case 'rejected':
        return <XCircle size={16} />
      case 'draft':
        return <FileText size={16} />
      default:
        return <FileText size={16} />
    }
  }

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || plan.category === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

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
          <h1 className="text-2xl font-bold text-brand-charcoal">Plans Management</h1>
          <p className="text-brand-lightGray">Manage building plans, approvals, and uploads</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn btn-secondary flex items-center space-x-2">
            <Upload size={16} />
            <span>Upload Plan</span>
          </button>
          <button className="btn btn-primary flex items-center space-x-2">
            <Plus size={16} />
            <span>Add Plan</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-lightGray" size={20} />
              <input
                type="text"
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Landscape">Landscape</option>
            </select>
            <button className="btn btn-secondary flex items-center space-x-2">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Plans Table */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-lightGray">
            <thead className="bg-primary-50">
              <tr>
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
                    {plan.uploadedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-lightGray">
                    {new Date(plan.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-brand-orange hover:text-primary-600">
                        <Eye size={16} />
                      </button>
                      <button className="text-brand-charcoal hover:text-primary-600">
                        <Edit size={16} />
                      </button>
                      <button className="text-danger-600 hover:text-danger-800">
                        <Trash2 size={16} />
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
            {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Get started by uploading your first building plan'
            }
          </p>
          <button className="btn btn-primary">
            <Plus size={16} className="mr-2" />
            Upload Plan
          </button>
        </div>
      )}
    </div>
  )
}

export default Plans 