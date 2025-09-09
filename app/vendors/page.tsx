"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Building2, Network, Wifi, Shield, Router, ArrowLeft, ExternalLink, Star } from "lucide-react"

// Mock vendor data
const vendors = [
  {
    id: "cisco",
    name: "Cisco",
    logo: "🔷",
    description: "Leading provider of networking hardware, software, and services",
    founded: "1984",
    headquarters: "San Jose, CA",
    deviceCount: 2400,
    categories: ["Switches", "Routers", "Firewalls", "Access Points"],
    rating: 4.8,
    marketShare: "28%",
  },
  {
    id: "huawei",
    name: "Huawei",
    logo: "🔴",
    description: "Global provider of ICT infrastructure and smart devices",
    founded: "1987",
    headquarters: "Shenzhen, China",
    deviceCount: 1800,
    categories: ["Switches", "Routers", "Access Points", "Firewalls"],
    rating: 4.6,
    marketShare: "18%",
  },
  {
    id: "fortinet",
    name: "Fortinet",
    logo: "🟠",
    description: "Cybersecurity solutions and network security appliances",
    founded: "2000",
    headquarters: "Sunnyvale, CA",
    deviceCount: 900,
    categories: ["Firewalls", "Switches", "Access Points"],
    rating: 4.7,
    marketShare: "12%",
  },
  {
    id: "juniper",
    name: "Juniper Networks",
    logo: "🟢",
    description: "High-performance network infrastructure solutions",
    founded: "1996",
    headquarters: "Sunnyvale, CA",
    deviceCount: 1200,
    categories: ["Routers", "Switches", "Firewalls"],
    rating: 4.5,
    marketShare: "8%",
  },
  {
    id: "arista",
    name: "Arista Networks",
    logo: "🔵",
    description: "Cloud networking solutions for data centers",
    founded: "2004",
    headquarters: "Santa Clara, CA",
    deviceCount: 600,
    categories: ["Switches", "Routers"],
    rating: 4.9,
    marketShare: "6%",
  },
  {
    id: "hpe",
    name: "HPE",
    logo: "🟣",
    description: "Enterprise technology solutions and networking",
    founded: "2015",
    headquarters: "San Jose, CA",
    deviceCount: 800,
    categories: ["Switches", "Access Points", "Routers"],
    rating: 4.4,
    marketShare: "5%",
  },
]

// Mock device data by vendor and category
const devicesByVendor = {
  cisco: {
    switches: [
      { id: 1, name: "Catalyst 9300-48P", model: "C9300-48P-A", price: "$8,500", specs: "48x 1GbE + 4x 10GbE SFP+" },
      { id: 2, name: "Catalyst 9200-24P", model: "C9200-24P-A", price: "$3,200", specs: "24x 1GbE + 4x 1GbE SFP" },
      { id: 3, name: "Nexus 9300-EX", model: "N9K-C93180YC-EX", price: "$15,000", specs: "48x 25GbE + 6x 100GbE" },
    ],
    routers: [
      { id: 4, name: "ASR 1001-X", model: "ASR1001-X", price: "$15,500", specs: "6x 1GbE + 2x 10GbE SFP+" },
      { id: 5, name: "ISR 4331", model: "ISR4331/K9", price: "$2,800", specs: "3x 1GbE + 2x NIM slots" },
    ],
    firewalls: [{ id: 6, name: "ASA 5516-X", model: "ASA5516-X", price: "$3,500", specs: "8x 1GbE + 1x Management" }],
    "access-points": [
      { id: 7, name: "Catalyst 9130AX", model: "C9130AXI-B", price: "$850", specs: "Wi-Fi 6E, 4x4:4 MIMO" },
    ],
  },
  huawei: {
    switches: [
      { id: 8, name: "S5735-L48P4S-A", model: "S5735-L48P4S-A", price: "$6,200", specs: "48x 1GbE + 4x 10GbE SFP+" },
      { id: 9, name: "S6720-30C-EI", model: "S6720-30C-EI-32S-AC", price: "$12,000", specs: "24x 10GbE + 8x 40GbE" },
    ],
    routers: [{ id: 10, name: "NE8000 M8", model: "NE8000-M8", price: "$45,000", specs: "400G routing capacity" }],
    "access-points": [
      { id: 11, name: "AirEngine 6761-21", model: "AirEngine6761-21", price: "$650", specs: "Wi-Fi 6, 4x4:4 MIMO" },
    ],
    firewalls: [{ id: 12, name: "USG6000E", model: "USG6630E-AC", price: "$8,500", specs: "20 Gbps throughput" }],
  },
  fortinet: {
    firewalls: [
      { id: 13, name: "FortiGate 200F", model: "FG-200F", price: "$12,000", specs: "20 Gbps throughput" },
      { id: 14, name: "FortiGate 100F", model: "FG-100F", price: "$3,500", specs: "10 Gbps throughput" },
    ],
    switches: [
      {
        id: 15,
        name: "FortiSwitch 248E",
        model: "FS-248E-FPOE",
        price: "$2,800",
        specs: "48x 1GbE PoE+ + 4x 10GbE SFP+",
      },
    ],
    "access-points": [{ id: 16, name: "FortiAP 431F", model: "FAP-431F", price: "$450", specs: "Wi-Fi 6, 2x2:2 MIMO" }],
  },
  juniper: {
    routers: [
      { id: 17, name: "MX204", model: "MX204-HWBASE-AC-FS", price: "$28,000", specs: "400 Gbps capacity" },
      { id: 18, name: "SRX300", model: "SRX300-SYS-JB", price: "$1,200", specs: "1 Gbps firewall throughput" },
    ],
    switches: [
      { id: 19, name: "EX4300-48P", model: "EX4300-48P", price: "$9,200", specs: "48x 1GbE + 4x 40GbE QSFP+" },
    ],
    firewalls: [{ id: 20, name: "SRX4600", model: "SRX4600-SYS-JB-AC", price: "$35,000", specs: "40 Gbps throughput" }],
  },
}

export default function VendorsPage() {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedVendors = [...filteredVendors].sort((a, b) => {
    switch (sortBy) {
      case "devices":
        return b.deviceCount - a.deviceCount
      case "rating":
        return b.rating - a.rating
      case "market":
        return Number.parseFloat(b.marketShare) - Number.parseFloat(a.marketShare)
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const selectedVendorData = vendors.find((v) => v.id === selectedVendor)
  const vendorDevices = selectedVendor ? devicesByVendor[selectedVendor as keyof typeof devicesByVendor] || {} : {}

  if (selectedVendor && selectedVendorData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 md:px-6 py-8 space-y-6">
        {/* Vendor Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setSelectedVendor(null)} className="bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Vendors
          </Button>
          <div className="flex items-center gap-4">
            <div className="text-4xl">{selectedVendorData.logo}</div>
            <div>
              <h1 className="text-3xl font-bold">{selectedVendorData.name}</h1>
              <p className="text-muted-foreground">{selectedVendorData.description}</p>
            </div>
          </div>
        </div>

        {/* Vendor Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{selectedVendorData.deviceCount.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total Devices</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-2xl font-bold">{selectedVendorData.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{selectedVendorData.marketShare}</div>
              <p className="text-xs text-muted-foreground">Market Share</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{selectedVendorData.founded}</div>
              <p className="text-xs text-muted-foreground">Founded</p>
            </CardContent>
          </Card>
        </div>

        {/* Device Categories */}
        <Tabs defaultValue="switches" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="switches" className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              Switches
            </TabsTrigger>
            <TabsTrigger value="routers" className="flex items-center gap-2">
              <Router className="h-4 w-4" />
              Routers
            </TabsTrigger>
            <TabsTrigger value="firewalls" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Firewalls
            </TabsTrigger>
            <TabsTrigger value="access-points" className="flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              Access Points
            </TabsTrigger>
          </TabsList>

          {Object.entries(vendorDevices).map(([category, devices]) => (
            <TabsContent key={category} value={category} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold capitalize">
                  {category.replace("-", " ")} ({devices.length})
                </h3>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {devices.map((device: any) => (
                  <Card key={device.id} className="hover:shadow-lg transition-all duration-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{device.name}</CardTitle>
                          <CardDescription className="font-mono text-sm">{device.model}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="text-lg font-bold">
                          {device.price}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{device.specs}</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          View Details
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Compare
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {devices.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No {category.replace("-", " ")} available from {selectedVendorData.name}
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Network Equipment Vendors</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore devices from leading network equipment manufacturers. Browse by vendor to find the perfect devices for
          your infrastructure.
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="devices">Device Count</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="market">Market Share</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedVendors.map((vendor) => (
          <Card
            key={vendor.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => setSelectedVendor(vendor.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{vendor.logo}</div>
                  <div>
                    <CardTitle className="text-xl">{vendor.name}</CardTitle>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">{vendor.rating}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">{vendor.marketShare}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">{vendor.description}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Devices:</span>
                  <span className="font-medium">{vendor.deviceCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Founded:</span>
                  <span className="font-medium">{vendor.founded}</span>
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

              <Button className="w-full mt-4 bg-transparent" variant="outline">
                <Building2 className="h-4 w-4 mr-2" />
                View Devices
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Summary */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{vendors.length}</div>
              <p className="text-sm text-muted-foreground">Total Vendors</p>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {vendors.reduce((sum, v) => sum + v.deviceCount, 0).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Total Devices</p>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {Math.round((vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length) * 10) / 10}
              </div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </div>
            <div>
              <div className="text-2xl font-bold">50+</div>
              <p className="text-sm text-muted-foreground">Device Categories</p>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
