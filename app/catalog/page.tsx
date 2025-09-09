"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Building2, Network, Wifi, Shield, Router, ArrowRight, Star, Monitor, Settings, Cpu } from "lucide-react"
import Link from "next/link"

const vendors = [
  {
    id: "cisco",
    name: "Cisco",
    logo: "🔷",
    description: "Leading provider of networking hardware, software, and services",
    deviceCount: 2400,
    categories: ["Switches", "Routers", "Firewalls", "Access Points"],
    color: "from-blue-500 to-blue-600",
    featured: true,
  },
  {
    id: "huawei",
    name: "Huawei",
    logo: "🔴",
    description: "Global provider of ICT infrastructure and smart devices",
    deviceCount: 1800,
    categories: ["Switches", "Routers", "Access Points", "Firewalls"],
    color: "from-red-500 to-red-600",
    featured: true,
  },
  {
    id: "fortinet",
    name: "Fortinet",
    logo: "🟠",
    description: "Cybersecurity solutions and network security appliances",
    deviceCount: 900,
    categories: ["Firewalls", "Switches", "Access Points"],
    color: "from-orange-500 to-orange-600",
    featured: true,
  },
  {
    id: "juniper",
    name: "Juniper Networks",
    logo: "🟢",
    description: "High-performance network infrastructure solutions",
    deviceCount: 1200,
    categories: ["Routers", "Switches", "Firewalls"],
    color: "from-green-500 to-green-600",
    featured: true,
  },
  {
    id: "arista",
    name: "Arista Networks",
    logo: "🔵",
    description: "Cloud networking solutions for data centers",
    deviceCount: 600,
    categories: ["Switches", "Routers"],
    color: "from-cyan-500 to-cyan-600",
    featured: false,
  },
  {
    id: "hpe",
    name: "HPE",
    logo: "🟣",
    description: "Enterprise technology solutions and networking",
    deviceCount: 800,
    categories: ["Switches", "Access Points", "Routers"],
    color: "from-purple-500 to-purple-600",
    featured: false,
  },
]

const deviceCategories = [
  { name: "Switches", icon: Network, count: 1200 },
  { name: "Routers", icon: Router, count: 800 },
  { name: "Firewalls", icon: Shield, count: 600 },
  { name: "Access Points", icon: Wifi, count: 400 },
  { name: "Access Controllers", icon: Settings, count: 300 },
  { name: "IdeaHubs", icon: Monitor, count: 150 },
  { name: "Accessories", icon: Cpu, count: 2000 },
]

export default function CatalogPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (searchQuery) {
      setSearchTerm(searchQuery)
    }
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // In a real app, you'd perform the search here
      console.log("Searching for:", searchTerm)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl text-foreground">
              {searchQuery ? (
                <>
                  Search Results for
                  <span className="text-primary"> "{searchQuery}"</span>
                </>
              ) : (
                <>
                  Explore Vendor
                  <span className="text-primary"> Catalogs</span>
                </>
              )}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {searchQuery ? (
                `Found devices matching "${searchQuery}" across our vendor catalogs. Browse and compare to find the perfect fit.`
              ) : (
                "Browse full product lineups from top vendors without digging through datasheets. Instantly view switches, firewalls, access points, and more."
              )}
            </p>
            
            {/* Search Bar */}
            <div className="w-full max-w-2xl mx-auto">
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
            </div>
          </div>
        </div>
      </section>

      {/* Device Categories Overview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-foreground">Browse by Device Type</h2>
            <p className="text-muted-foreground">Find devices by category across all vendors</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 max-w-6xl mx-auto">
            {deviceCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <Card
                  key={category.name}
                  className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
                >
                  <CardContent className="pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count}+ devices</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-foreground">Featured Vendors</h2>
            <p className="text-muted-foreground">Explore devices from leading network equipment manufacturers</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {vendors.filter(vendor => vendor.featured).map((vendor, index) => (
              <Card
                key={vendor.id}
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                asChild
              >
                <Link href={`/catalog/${vendor.id}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r ${vendor.color} text-white text-2xl`}>
                        {vendor.logo}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{vendor.name}</CardTitle>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-muted-foreground">Featured</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{vendor.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Devices:</span>
                        <span className="font-medium">{vendor.deviceCount.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Categories:</p>
                      <div className="flex flex-wrap gap-1">
                        {vendor.categories.map((category) => (
                          <Badge key={category} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-primary group-hover:text-primary/80 transition-colors">
                        Browse Catalog
                      </span>
                      <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Vendors */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-foreground">All Vendors</h2>
            <p className="text-muted-foreground">Complete list of supported network equipment manufacturers</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {vendors.map((vendor) => (
              <Card
                key={vendor.id}
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                asChild
              >
                <Link href={`/catalog/${vendor.id}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${vendor.color} text-white text-xl`}>
                        {vendor.logo}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {vendor.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {vendor.deviceCount.toLocaleString()} devices
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary-foreground">
              Ready to compare devices?
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Found devices you're interested in? Use our comparison tool to evaluate them side-by-side.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/compare">Start Comparing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
