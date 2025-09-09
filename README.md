# NetScout - The Datasheet Killer! 🔍

A comprehensive web platform for network engineers to quickly search, compare, and map multi-vendor network devices without digging through endless datasheets. Built for professionals who value their time.

![NetScout Banner](https://img.shields.io/badge/NetScout-The%20Datasheet%20Killer-orange?style=for-the-badge&logo=network&logoColor=white)

## 🚀 Features

### 🔍 **Multi-Vendor Device Search**
- Search across 50+ vendors in seconds
- Intelligent filters and instant results
- Real-time search with authentication integration

### 📊 **Smart Device Comparison**
- Compare up to 3 devices side-by-side
- Detailed specifications, features, and pricing
- Cross-vendor compatibility analysis

### 🏢 **Comprehensive Vendor Catalogs**
- **Cisco** - 2,400+ devices across all categories
- **Huawei** - 1,800+ devices with full specifications
- **Fortinet** - 900+ security and networking devices
- **Juniper** - 1,200+ high-performance network solutions

### 📱 **7 Device Categories**
- **Switches** (1,200+ devices) - Network switching equipment
- **Routers** (800+ devices) - Edge and core routing
- **Firewalls** (600+ devices) - Security appliances and NGFW
- **Access Points** (400+ devices) - Wireless networking
- **Access Controllers** (300+ devices) - WLAN management
- **IdeaHubs** (150+ devices) - Collaboration displays
- **Accessories** (2,000+ devices) - Transceivers, power supplies, cables

### 💰 **Transparent Pricing**
- **Starter Plan** - $10/month - Perfect for small teams
- **Professional Plan** - $25/month - Advanced features for growing teams
- **Enterprise Plan** - $50/month - Full access for large organizations

## 🛠️ Technology Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** Radix UI
- **Package Manager:** pnpm
- **Deployment:** Vercel Ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RoberaET/NetScout.git
   cd NetScout
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
NetScout/
├── app/                    # Next.js App Router pages
│   ├── catalog/           # Device catalog pages
│   │   ├── cisco/        # Cisco device catalog
│   │   ├── huawei/       # Huawei device catalog
│   │   ├── fortinet/     # Fortinet device catalog
│   │   └── juniper/      # Juniper device catalog
│   ├── compare/           # Device comparison page
│   ├── login/             # Authentication pages
│   ├── signup/
│   ├── pricing/           # Pricing plans
│   └── vendors/           # Vendor overview
├── components/            # Reusable UI components
│   ├── ui/               # Radix UI components
│   ├── header.tsx        # Navigation header
│   └── footer.tsx        # Site footer
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
└── public/               # Static assets
```

## 🎨 Design System

### Liquid Glass Aesthetic
- Modern glassmorphism design
- Subtle gradients and blur effects
- Smooth animations and transitions
- Professional color palette

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Accessible navigation

## 🔐 Authentication

- **Social Login:** Google, Apple, Meta
- **Email/Password:** Traditional authentication
- **Search Integration:** Redirects to login for search functionality
- **Session Management:** Secure user sessions

## 📊 Device Data

Each device includes:
- **Basic Info:** Model, name, vendor
- **Specifications:** Ports, throughput, power consumption
- **Features:** Key capabilities and technologies
- **Pricing:** Current market pricing
- **Family:** Device category (Enterprise, SMB, etc.)

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push
3. Environment variables configured automatically

### Other Platforms
- **Netlify:** Compatible with Next.js
- **Railway:** Easy deployment with database support
- **Docker:** Containerized deployment available

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Radix UI** for accessible component primitives
- **Tailwind CSS** for utility-first styling
- **Next.js** team for the amazing framework
- **Network engineering community** for inspiration and feedback

## 📞 Support

- **Documentation:** [docs.netscout.dev](https://docs.netscout.dev)
- **Issues:** [GitHub Issues](https://github.com/RoberaET/NetScout/issues)
- **Discussions:** [GitHub Discussions](https://github.com/RoberaET/NetScout/discussions)
- **Email:** support@netscout.dev

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=RoberaET/NetScout&type=Date)](https://star-history.com/#RoberaET/NetScout&Date)

---

**Built with ❤️ for the network engineering community**

*Stop wasting time searching through vendor documentation. Get the information you need instantly with NetScout.*