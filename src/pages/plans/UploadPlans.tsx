import { useState } from 'react'
import { 
  Upload, 
  FileText, 
  Image, 
  X, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Save,
  Eye
} from 'lucide-react'

const UploadPlans = () => {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [planDetails, setPlanDetails] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    features: [''],
    tags: ['']
  })
  const [uploading, setUploading] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/') || 
      file.type === 'application/pdf' ||
      file.type === 'application/zip' ||
      file.name.endsWith('.dwg')
    )
    setUploadedFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const addFeature = () => {
    setPlanDetails(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const removeFeature = (index: number) => {
    setPlanDetails(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const updateFeature = (index: number, value: string) => {
    setPlanDetails(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }))
  }

  const addTag = () => {
    setPlanDetails(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }))
  }

  const removeTag = (index: number) => {
    setPlanDetails(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }))
  }

  const updateTag = (index: number, value: string) => {
    setPlanDetails(prev => ({
      ...prev,
      tags: prev.tags.map((tag, i) => i === index ? value : tag)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Plan uploaded successfully:', { planDetails, uploadedFiles })
      // Reset form
      setPlanDetails({
        title: '',
        description: '',
        category: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        squareFootage: '',
        features: [''],
        tags: ['']
      })
      setUploadedFiles([])
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image size={20} />
    if (file.type === 'application/pdf') return <FileText size={20} />
    if (file.type === 'application/zip' || file.name.endsWith('.dwg')) return <FileText size={20} />
    return <FileText size={20} />
  }

  const getFileType = (file: File) => {
    if (file.type.startsWith('image/')) return 'Image'
    if (file.type === 'application/pdf') return 'PDF'
    if (file.type === 'application/zip') return 'ZIP Archive'
    if (file.name.endsWith('.dwg')) return 'AutoCAD Drawing'
    return 'Document'
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-charcoal">Upload Plans</h1>
          <p className="text-brand-lightGray">Upload new building plans and architectural designs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Upload Section */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <h3 className="text-lg font-medium text-brand-charcoal mb-4">Upload Files</h3>
          
          {/* Drag & Drop Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-brand-orange bg-orange-50' 
                : 'border-brand-lightGray hover:border-brand-orange hover:bg-orange-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload size={48} className="text-brand-lightGray mx-auto mb-4" />
            <p className="text-lg font-medium text-brand-charcoal mb-2">
              Drag and drop files here
            </p>
            <p className="text-brand-lightGray mb-4">
              or click to browse files
            </p>
            <input
              type="file"
              multiple
              accept="image/*,.pdf,.zip,.dwg"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="btn btn-primary cursor-pointer"
            >
              <Upload size={16} className="mr-2" />
              Choose Files
            </label>
            <p className="text-sm text-brand-lightGray mt-2">
              Supports: Images, PDF, ZIP, DWG files
            </p>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-brand-charcoal mb-3">Uploaded Files</h4>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file)}
                      <div>
                        <p className="text-sm font-medium text-brand-charcoal">{file.name}</p>
                        <p className="text-xs text-brand-lightGray">
                          {getFileType(file)} • {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-danger-600 hover:text-danger-800"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Plan Details Form */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <h3 className="text-lg font-medium text-brand-charcoal mb-4">Plan Details</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-2">
                Plan Title *
              </label>
              <input
                type="text"
                required
                value={planDetails.title}
                onChange={(e) => setPlanDetails(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                placeholder="e.g., Modern 3-Bedroom Villa"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-2">
                Description *
              </label>
              <textarea
                required
                rows={3}
                value={planDetails.description}
                onChange={(e) => setPlanDetails(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                placeholder="Describe the plan features and design..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Category *
                </label>
                <select
                  required
                  value={planDetails.category}
                  onChange={(e) => setPlanDetails(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Price (USD) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={planDetails.price}
                  onChange={(e) => setPlanDetails(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Bedrooms
                </label>
                <input
                  type="number"
                  min="0"
                  value={planDetails.bedrooms}
                  onChange={(e) => setPlanDetails(prev => ({ ...prev, bedrooms: e.target.value }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Bathrooms
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={planDetails.bathrooms}
                  onChange={(e) => setPlanDetails(prev => ({ ...prev, bathrooms: e.target.value }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Sq Ft
                </label>
                <input
                  type="number"
                  min="0"
                  value={planDetails.squareFootage}
                  onChange={(e) => setPlanDetails(prev => ({ ...prev, squareFootage: e.target.value }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-2">
                Features
              </label>
              <div className="space-y-2">
                {planDetails.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                      placeholder="e.g., Open Kitchen, Garden"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-danger-600 hover:text-danger-800"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-brand-orange hover:text-primary-600 text-sm flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Add Feature
                </button>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-brand-charcoal mb-2">
                Tags
              </label>
              <div className="space-y-2">
                {planDetails.tags.map((tag, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => updateTag(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                      placeholder="e.g., modern, sustainable"
                    />
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="text-danger-600 hover:text-danger-800"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTag}
                  className="text-brand-orange hover:text-primary-600 text-sm flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Add Tag
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading || uploadedFiles.length === 0}
              className="w-full btn btn-primary flex items-center justify-center space-x-2"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Upload Plan</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UploadPlans
