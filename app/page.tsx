"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, GitCompare, Map, Zap, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // For now, we'll assume user is not signed in and redirect to login
      // In a real app, you'd check authentication status here
      router.push(`/login?redirect=/catalog&search=${encodeURIComponent(searchTerm)}`)
    }
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Search */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4 max-w-4xl animate-in fade-in slide-in-from-bottom duration-700">
              <p className="text-lg text-primary">The Datasheet Killer!</p>
              <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
                Find Network Devices
                <span className="text-primary"> Instantly</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty leading-relaxed">
                Search, compare, and map multi-vendor network devices without digging through endless datasheets. Built
                for network engineers who value their time.
              </p>
            </div>

            <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom duration-700 delay-200">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search for switches, routers, firewalls, access points..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg border-2 border-border focus:border-primary rounded-xl bg-background/50 backdrop-blur"
                />
                <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6">
                  Search
                </Button>
              </form>
              <p className="text-sm text-muted-foreground mt-2">
                Try: "Cisco Catalyst 9300", "Fortinet FortiGate", or "Juniper EX4300"
              </p>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground animate-in fade-in duration-700 delay-400">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span>4.9/5 rating</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <span>10,000+ network engineers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-foreground">Get Started Quickly</h2>
            <p className="text-muted-foreground">Jump right into the tools you need</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <Link href="/compare">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <GitCompare className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Compare Devices</CardTitle>
                        <CardDescription>Side-by-side specifications</CardDescription>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Compare up to 3 devices from different vendors. See specs, features, and pricing in one view.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/map">
              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                        <Map className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Network Map</CardTitle>
                        <CardDescription>Visual topology builder</CardDescription>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop devices to create network topologies. Plan your infrastructure visually.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Vendors Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-foreground">Featured Vendors</h2>
            <p className="text-muted-foreground">
              Search devices from the world's leading network equipment manufacturers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Cisco", logo: "🔷", devices: "2,400+ devices" },
              { name: "Huawei", logo: "🔴", devices: "1,800+ devices" },
              { name: "Fortinet", logo: "🟠", devices: "900+ devices" },
              { name: "Juniper", logo: "🟢", devices: "1,200+ devices" },
            ].map((vendor, index) => (
              <Card
                key={vendor.name}
                className={`text-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer animate-in fade-in slide-in-from-bottom delay-${index * 100 + 200}`}
              >
                <CardContent className="pt-6">
                  <div className="text-4xl mb-3">{vendor.logo}</div>
                  <h3 className="font-semibold text-lg mb-1">{vendor.name}</h3>
                  <p className="text-sm text-muted-foreground">{vendor.devices}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/vendors">
              <Button variant="outline" className="hover:scale-105 transition-transform bg-transparent">
                View All Vendors
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-foreground">Why Network Engineers Choose NetScout</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stop wasting time searching through vendor documentation. Get the information you need instantly.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Multi-Vendor Search",
                description: "Search across 50+ vendors in seconds with intelligent filters and instant results.",
              },
              {
                icon: GitCompare,
                title: "Smart Comparisons",
                description: "Compare specifications, features, and pricing across different vendors and models.",
              },
              {
                icon: Zap,
                title: "Instant Access",
                description: "Get detailed specs, port configs, and compatibility info without PDF hunting.",
              },
            ].map((feature, index) => (
              <Card
                key={feature.title}
                className={`text-center hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom delay-${index * 100 + 200}`}
              >
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .animate-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .fade-in {
          opacity: 0;
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .slide-in-from-bottom {
          transform: translateY(20px);
          opacity: 0;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
