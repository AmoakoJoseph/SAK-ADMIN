# SAK Admin Frontend

A comprehensive administrative dashboard for managing the SAK Constructions building plan marketplace.

## 🚀 Features

- **Dashboard Overview**: Real-time statistics and analytics
- **Plan Management**: Upload, edit, and manage building plans
- **Order Processing**: Handle customer orders and support
- **User Management**: Manage user accounts and permissions
- **Analytics**: Business intelligence and insights
- **Settings**: Admin configuration and preferences

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **React Router DOM** for navigation
- **Zustand** for state management
- **React Query/TanStack Query** for API data fetching
- **Recharts** for analytics charts
- **React Hook Form** for form handling
- **Zod** for validation
- **Lucide React** for icons

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── forms/           # Form components
│   ├── charts/          # Analytics charts
│   └── layout/          # Layout components
├── pages/
│   ├── dashboard/       # Dashboard pages
│   ├── plans/          # Plan management
│   ├── orders/         # Order management
│   ├── users/          # User management
│   ├── analytics/      # Analytics pages
│   └── settings/       # Admin settings
├── hooks/              # Custom hooks
├── services/           # API services
├── stores/             # Zustand stores
├── types/              # TypeScript types
├── utils/              # Utility functions
└── constants/          # App constants
```

## 🎯 Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Documentation

- [Technical Specifications](./ADMIN_TECHNICAL_SPECS.md)
- [Frontend Documentation](./ADMIN_FRONTEND_DOCUMENTATION.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.