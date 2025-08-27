import React, { useState } from 'react'
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  Checkbox, 
  Divider, 
  Space, 
  Alert,
  Row,
  Col,
  App
} from 'antd'
import { 
  LockOutlined, 
  EyeOutlined, 
  EyeInvisibleOutlined,
  GoogleOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  MailOutlined,
  SafetyOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice'

const { Title, Text, Link } = Typography

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { message } = App.useApp()

  const handleLogin = async (values: any) => {
    setLoading(true)
    dispatch(loginStart())
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock successful login
      const userData = {
        id: '1',
        name: 'John Doe',
        email: values.email,
        role: 'superAdmin' as const,
        avatar: undefined,
        token: 'mock-jwt-token'
      }
      
      dispatch(loginSuccess(userData))
      message.success('Login successful! Welcome back.')
      
      // Store in localStorage if remember me is checked
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(userData))
      }
      
      navigate('/')
    } catch (error) {
      dispatch(loginFailure('Invalid email or password'))
      message.error('Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = () => {
    navigate('/forgot-password')
  }

  const handleSocialLogin = (provider: string) => {
    message.info(`${provider} login will be implemented soon.`)
  }

  const handleDemoLogin = () => {
    form.setFieldsValue({
      email: 'admin@sakconstructions.com',
      password: 'admin123'
    })
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

        {/* Login Card */}
        <Card className="shadow-lg border-0">
          <div className="mb-6">
            <Title level={3} className="text-center mb-2">
              Welcome Back
            </Title>
            <Text type="secondary" className="text-center block">
              Sign in to your account to continue
            </Text>
      </div>

          {/* Demo Login Alert */}
          <Alert
            message="Demo Account"
            description="Use admin@sakconstructions.com / admin123 for demo access"
            type="info"
            showIcon
            className="mb-6"
            action={
              <Button size="small" type="link" onClick={handleDemoLogin}>
                Fill Demo
              </Button>
            }
          />

          {/* Login Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleLogin}
            initialValues={{
              email: '',
              password: '',
              rememberMe: false
            }}
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
                placeholder="Enter your email"
                size="large"
              />
            </Form.Item>

            <Form.Item
                  name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please enter your password' },
                { min: 6, message: 'Password must be at least 6 characters' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                  placeholder="Enter your password"
                size="large"
                iconRender={(visible) => 
                  visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item>
              <div className="flex justify-between items-center">
                <Form.Item name="rememberMe" valuePropName="checked" noStyle>
                  <Checkbox 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  >
                    Remember me
                  </Checkbox>
                </Form.Item>
                <Button 
                  type="link" 
                  className="p-0"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </Button>
              </div>
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
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Form.Item>
          </Form>

          {/* Divider */}
          <Divider>
            <Text type="secondary">or continue with</Text>
          </Divider>

          {/* Social Login */}
          <Space direction="vertical" className="w-full">
            <Button 
              icon={<GoogleOutlined />}
              size="large"
              block
              onClick={() => handleSocialLogin('Google')}
              className="border-gray-300 text-gray-700 hover:border-gray-400"
            >
              Continue with Google
            </Button>
            
            <Row gutter={8}>
              <Col span={12}>
                <Button 
                  icon={<FacebookOutlined />}
                  size="large"
                  block
                  onClick={() => handleSocialLogin('Facebook')}
                  className="border-blue-500 text-blue-600 hover:border-blue-600"
                >
                  Facebook
                </Button>
              </Col>
              <Col span={12}>
                <Button 
                  icon={<LinkedinOutlined />}
                  size="large"
                  block
                  onClick={() => handleSocialLogin('LinkedIn')}
                  className="border-blue-600 text-blue-700 hover:border-blue-700"
                >
                  LinkedIn
                </Button>
              </Col>
            </Row>
          </Space>

          {/* Footer */}
          <div className="mt-8 text-center">
            <Text type="secondary">
              Don't have an account?{' '}
              <Link href="#" className="text-orange-500">
                Contact administrator
              </Link>
            </Text>
          </div>
        </Card>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <Space split={<Divider type="vertical" />}>
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

export default Login 
