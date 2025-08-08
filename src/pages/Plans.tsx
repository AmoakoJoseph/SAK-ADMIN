import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Upload
} from 'lucide-react'
import { Plan } from '../types'
import PlanForm from '../components/plans/PlanForm'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import toast from 'react-hot-toast'

const Plans = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all')
  const [selectedPlans, setSelectedPlans] = useState<string[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deletePlan, setDeletePlan] = useState<Plan | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Mock data - replace with real API calls
  const plans: Plan[] = [
    {
      id: '1',
      title: 'Modern Villa Design',
      description: 'Contemporary 3-bedroom villa with open floor plan',
      category: 'Residential',
      price: 299.99,
      status: 'published',
      images: ['/api/images/villa1.jpg'],
      files: ['/api/files/villa1.zip'],
      downloads: 156,
      views: 1247,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-06-20'),
    },
    {
      id: '2',
      title: 'Commercial Office Complex',
      description: 'Multi-story office building with modern amenities',
      category: 'Commercial',
      price: 599.99,
      status: 'published',
      images: ['/api/images/office1.jpg'],
      files: ['/api/files/office1.zip'],
      downloads: 89,
      views: 567,
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-06-18'),
    },
    {
      id: '3',
      title: 'Sustainable Home',
      description: 'Eco-friendly residential design with solar integration',
      category: 'Residential',
      price: 399.99,
      status: 'draft',
      images: ['/api/images/eco1.jpg'],
      files: ['/api/files/eco1.zip'],
      downloads: 0,
      views: 234,
      createdAt: new Date('2024-06-01'),
      updatedAt: new Date('2024-06-15'),
    },
  ]

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || plan.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: Plan['status']) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-800',
      published: 'bg-success-100 text-success-800',
      archived: 'bg-warning-100 text-warning-800',
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const handleBulkAction = (action: 'delete' | 'publish' | 'archive') => {
    console.log(`Bulk ${action} for plans:`, selectedPlans)
    // Implement bulk actions
  }

  const handleAddPlan = () => {
    setEditingPlan(null)
    setIsFormOpen(true)
  }

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan(plan)
    setIsFormOpen(true)
  }

  const handleDeletePlan = (plan: Plan) => {
    setDeletePlan(plan)
  }

  const handleConfirmDelete = async () => {
    if (!deletePlan) return

    setIsDeleting(true)
    try {
      // Mock API call - replace with real delete
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Remove from plans array
      const updatedPlans = plans.filter(p => p.id !== deletePlan.id)
      // In real app, you'd update the state from API response
      
      toast.success('Plan deleted successfully')
      setDeletePlan(null)
    } catch (error) {
      toast.error('Failed to delete plan')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleSubmitPlan = async (data: any) => {
    setIsSubmitting(true)
    try {
      // Mock API call - replace with real save
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (editingPlan) {
        // Update existing plan
        toast.success('Plan updated successfully')
      } else {
        // Create new plan
        toast.success('Plan created successfully')
      }
      
      setIsFormOpen(false)
      setEditingPlan(null)
    } catch (error) {
      toast.error('Failed to save plan')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plans Management</h1>
          <p className="text-gray-600">Manage building plans and inventory</p>
        </div>
        <button 
          onClick={handleAddPlan}
          className="btn btn-primary btn-md"
        >
          <Plus className="w-4 h-4 mr-2" />
          Upload New Plan
        </button>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="input"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedPlans.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('publish')}
                className="btn btn-secondary btn-sm"
              >
                Publish Selected
              </button>
              <button
                onClick={() => handleBulkAction('archive')}
                className="btn btn-secondary btn-sm"
              >
                Archive Selected
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="btn btn-danger btn-sm"
              >
                Delete Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Plans Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">
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
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Plan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Price</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Downloads</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Views</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Created</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan) => (
                <tr key={plan.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedPlans.includes(plan.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPlans([...selectedPlans, plan.id])
                        } else {
                          setSelectedPlans(selectedPlans.filter(id => id !== plan.id))
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{plan.title}</div>
                      <div className="text-sm text-gray-500">{plan.description}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{plan.category}</td>
                  <td className="py-3 px-4 text-sm font-medium">${plan.price}</td>
                  <td className="py-3 px-4">{getStatusBadge(plan.status)}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{plan.downloads}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{plan.views}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {plan.createdAt.toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="View plan"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditPlan(plan)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Edit plan"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Download plan"
                      >
                        <Download size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeletePlan(plan)}
                        className="p-1 text-gray-400 hover:text-danger-600"
                        title="Delete plan"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPlans.length === 0 && (
          <div className="text-center py-12">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No plans found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by uploading your first plan.'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <div className="mt-6">
                <button className="btn btn-primary btn-md">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Plan
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Plan Form Modal */}
      <PlanForm
        plan={editingPlan}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingPlan(null)
        }}
        onSubmit={handleSubmitPlan}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deletePlan}
        onClose={() => setDeletePlan(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Plan"
        message={`Are you sure you want to delete "${deletePlan?.title}"? This action cannot be undone.`}
        confirmText="Delete Plan"
        cancelText="Cancel"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  )
}

export default Plans 