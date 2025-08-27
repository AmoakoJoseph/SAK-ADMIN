import React, { useState } from 'react'
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  message, 
  Alert,
  Space
} from 'antd'
import { 
  MailOutlined, 
  ArrowLeftOutlined,
  SafetyOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Title, Text, Link } = Typography

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const handleResetPassword = async (values: any) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setEmailSent(true)
      message.success('Password reset email sent successfully!')
    } catch (error) {
      message.error('Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleBackToLogin = () => {
    navigate('/login')
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-lg border-0 text-center">
            <div className="mb-6">
              <CheckCircleOutlined className="text-6xl text-green-500 mb-4" />
              <Title level={3} className="mb-2">
                Check Your Email
              </Title>
              <Text type="secondary" className="block mb-4">
                We've sent a password reset link to your email address.
              </Text>
            </div>

            <Alert
              message="Reset Link Sent"
              description="Please check your email and click the reset link to create a new password. The link will expire in 1 hour."
              type="success"
              showIcon
              className="mb-6"
            />

            <Space direction="vertical" className="w-full">
              <Button 
                type="primary" 
                size="large" 
                block
                onClick={handleBackToLogin}
                className="bg-orange-500 hover:bg-orange-600 border-orange-500"
              >
                Back to Login
              </Button>
              <Button 
                size="large" 
                block
                onClick={() => {
                  setEmailSent(false)
                  form.resetFields()
                }}
              >
                Send Another Email
              </Button>
            </Space>

            <div className="mt-6 text-center">
              <Text type="secondary" className="text-sm">
                Didn't receive the email? Check your spam folder or{' '}
                <Link href="#" className="text-orange-500">
                  contact support
                </Link>
              </Text>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafetyOutlined className="text-white text-2xl" />
            </div>
            <Title level={2} className="text-gray-800 mb-2">
              SAK CONSTRUCTIONS GH
            </Title>
            <Text type="secondary" className="text-lg">
              Admin Interface
            </Text>
          </div>
        </div>

        {/* Forgot Password Card */}
        <Card className="shadow-lg border-0">
          <div className="mb-6">
            <Title level={3} className="text-center mb-2">
              Forgot Password
            </Title>
            <Text type="secondary" className="text-center block">
              Enter your email address and we'll send you a link to reset your password
            </Text>
          </div>

          <Alert
            message="Password Reset"
            description="Enter the email address associated with your account and we'll send you a secure link to reset your password."
            type="info"
            showIcon
            className="mb-6"
          />

          <Form
            form={form}
            layout="vertical"
            onFinish={handleResetPassword}
          >
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input 
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Enter your email address"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                size="large"
                block
                className="bg-orange-500 hover:bg-orange-600 border-orange-500"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-6 text-center">
            <Button 
              type="link" 
              icon={<ArrowLeftOutlined />}
              onClick={handleBackToLogin}
              className="text-orange-500"
            >
              Back to Login
            </Button>
          </div>
        </Card>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <Space split={<div className="text-gray-300">|</div>}>
            <Link href="#" className="text-gray-500 text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-500 text-sm">
              Support
            </Link>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
