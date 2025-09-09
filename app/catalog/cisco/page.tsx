"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Network, Wifi, Shield, Router, ArrowLeft, ExternalLink, Star, Plus, Monitor, Settings, Cpu } from "lucide-react"
import Link from "next/link"

const deviceCategories = [
  { id: "switches", name: "Switches", icon: Network, count: 45 },
  { id: "routers", name: "Routers", icon: Router, count: 32 },
  { id: "firewalls", name: "Firewalls", icon: Shield, count: 28 },
  { id: "access-points", name: "Access Points", icon: Wifi, count: 18 },
  { id: "access-controllers", name: "Access Controllers", icon: Settings, count: 15 },
  { id: "ideahubs", name: "IdeaHubs", icon: Monitor, count: 6 },
  { id: "accessories", name: "Accessories", icon: Cpu, count: 52 },
]

const devices = {
  switches: [
    {
      id: 1,
      name: "Catalyst 9300-48P",
      model: "C9300-48P-A",
      price: "$8,500",
      specs: "48x 1GbE + 4x 10GbE SFP+",
      throughput: "176 Gbps",
      power: "435W",
      features: ["StackWise-480", "UPOE+", "DNA Ready", "MACsec"],
      family: "Enterprise",
      image: "🔷",
    },
    {
      id: 2,
      name: "Catalyst 9200-24P",
      model: "C9200-24P-A",
      price: "$3,200",
      specs: "24x 1GbE + 4x 1GbE SFP",
      throughput: "128 Gbps",
      power: "370W",
      features: ["StackWise-160", "PoE+", "DNA Ready"],
      family: "SMB",
      image: "🔷",
    },
    {
      id: 3,
      name: "Nexus 9300-EX",
      model: "N9K-C93180YC-EX",
      price: "$15,000",
      specs: "48x 25GbE + 6x 100GbE",
      throughput: "2.4 Tbps",
      power: "650W",
      features: ["VXLAN", "EVPN", "ACI Ready"],
      family: "Data Center",
      image: "🔷",
    },
  ],
  routers: [
    {
      id: 4,
      name: "ASR 1001-X",
      model: "ASR1001-X",
      price: "$15,500",
      specs: "6x 1GbE + 2x 10GbE SFP+",
      throughput: "20 Gbps",
      power: "250W",
      features: ["SD-WAN", "MPLS", "BGP", "OSPF"],
      family: "Enterprise",
      image: "🔷",
    },
    {
      id: 5,
      name: "ISR 4331",
      model: "ISR4331/K9",
      price: "$2,800",
      specs: "3x 1GbE + 2x NIM slots",
      throughput: "5 Gbps",
      power: "150W",
      features: ["SD-WAN", "Security", "Voice"],
      family: "SMB",
      image: "🔷",
    },
  ],
  firewalls: [
    {
      id: 6,
      name: "ASA 5516-X",
      model: "ASA5516-X",
      price: "$3,500",
      specs: "8x 1GbE + 1x Management",
      throughput: "2 Gbps",
      power: "65W",
      features: ["VPN", "IPS", "AMP", "URL Filtering"],
      family: "Enterprise",
      image: "🔷",
    },
  ],
  "access-points": [
    {
      id: 7,
      name: "Catalyst 9130AX",
      model: "C9130AXI-B",
      price: "$850",
      specs: "Wi-Fi 6E, 4x4:4 MIMO",
      throughput: "5.4 Gbps",
      power: "PoE+",
      features: ["Wi-Fi 6E", "4x4 MIMO", "mDNS", "Bonjour"],
      family: "Enterprise",
      image: "🔷",
    },
  ],
  "access-controllers": [
    {
      id: 8,
      name: "WLC 5520",
      model: "AIR-CT5520-K9",
      price: "$4,200",
      specs: "Wireless LAN Controller",
      throughput: "20 Gbps",
      power: "AC",
      features: ["WLC", "Cloud Management", "SDN Ready", "High Availability"],
      family: "Enterprise",
      image: "🔷",
    },
    {
      id: 9,
      name: "WLC 2504",
      model: "AIR-CT2504-K9",
      price: "$1,800",
      specs: "Small Business WLC",
      throughput: "5 Gbps",
      power: "AC",
      features: ["WLC", "Cloud Management", "Easy Setup"],
      family: "SMB",
      image: "🔷",
    },
  ],
  "ideahubs": [
    {
      id: 10,
      name: "Webex Board 55",
      model: "WEBEX-BOARD-55",
      price: "$5,200",
      specs: "55-inch 4K touch display",
      throughput: "N/A",
      power: "AC",
      features: ["4K Display", "Touch Screen", "Webex Integration", "Whiteboard"],
      family: "Collaboration",
      image: "🔷",
    },
    {
      id: 11,
      name: "Webex Board 70",
      model: "WEBEX-BOARD-70",
      price: "$7,500",
      specs: "70-inch 4K touch display",
      throughput: "N/A",
      power: "AC",
      features: ["4K Display", "Touch Screen", "Webex Integration", "Whiteboard", "AI Features"],
      family: "Enterprise",
      image: "🔷",
    },
  ],
  "accessories": [
    {
      id: 12,
      name: "SFP-10G-SR",
      model: "SFP-10G-SR",
      price: "$220",
      specs: "10G SFP+ SR transceiver",
      throughput: "10 Gbps",
      power: "1W",
      features: ["10G SFP+", "SR Optics", "300m Range"],
      family: "Optics",
      image: "🔷",
    },
    {
      id: 13,
      name: "QSFP-40G-SR4",
      model: "QSFP-40G-SR4",
      price: "$480",
      specs: "40G QSFP+ SR4 transceiver",
      throughput: "40 Gbps",
      power: "3.5W",
      features: ["40G QSFP+", "SR4 Optics", "100m Range"],
      family: "Optics",
      image: "🔷",
    },
    {
      id: 14,
      name: "Power Supply 715W",
      model: "PWR-715W-AC",
      price: "$450",
      specs: "715W AC power supply",
      throughput: "N/A",
      power: "715W",
      features: ["AC Power", "715W", "Hot Swappable", "Redundant"],
      family: "Power",
      image: "🔷",
    },
  ],
}

export default function CiscoCatalogPage() {
  const [selectedDevices, setSelectedDevices] = useState<number[]>([])

  const addToCompare = (deviceId: number) => {
    if (selectedDevices.length < 3 && !selectedDevices.includes(deviceId)) {
      setSelectedDevices([...selectedDevices, deviceId])
    }
  }

  const removeFromCompare = (deviceId: number) => {
    setSelectedDevices(selectedDevices.filter(id => id !== deviceId))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" asChild>
              <Link href="/catalog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Catalog
              </Link>
            </Button>
            <div className="flex items-center gap-4">
              <div className="text-4xl">🔷</div>
              <div>
                <h1 className="text-3xl font-bold">Cisco Devices</h1>
                <p className="text-muted-foreground">Explore Cisco's complete networking portfolio</p>
              </div>
            </div>
          </div>

          {/* Selected for Comparison */}
          {selectedDevices.length > 0 && (
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Selected for Comparison ({selectedDevices.length}/3)</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedDevices([])}
                >
                  Clear All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedDevices.map(deviceId => {
                  const device = Object.values(devices).flat().find(d => d.id === deviceId)
                  return device ? (
                    <Badge key={deviceId} variant="secondary" className="px-3 py-1">
                      {device.name}
                      <button 
                        onClick={() => removeFromCompare(deviceId)} 
                        className="ml-2 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ) : null
                })}
              </div>
              <div className="mt-3">
                <Button asChild>
                  <Link href="/compare">Compare Selected Devices</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Device Categories */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <Tabs defaultValue="switches" className="w-full">
          <div className="overflow-x-auto mb-8">
            <TabsList className="inline-flex w-max min-w-full">
              {deviceCategories.map((category) => {
                const Icon = category.icon
                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2 whitespace-nowrap">
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.name}</span>
                    <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                    <Badge variant="secondary" className="ml-1">{category.count}</Badge>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>

          {deviceCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{category.name} ({devices[category.id as keyof typeof devices]?.length || 0})</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {devices[category.id as keyof typeof devices]?.map((device) => {
                  const isSelected = selectedDevices.includes(device.id)
                  const canAdd = selectedDevices.length < 3 && !isSelected
                  
                  return (
                    <Card key={device.id} className="group hover:shadow-lg transition-all duration-200">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{device.image}</div>
                            <div>
                              <CardTitle className="text-lg">{device.name}</CardTitle>
                              <CardDescription className="font-mono text-sm">{device.model}</CardDescription>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge variant="secondary" className="text-lg font-bold">
                              {device.price}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {device.family}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">{device.specs}</p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Throughput:</span>
                              <span className="ml-1 font-medium">{device.throughput}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Power:</span>
                              <span className="ml-1 font-medium">{device.power}</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground">Key Features:</p>
                          <div className="flex flex-wrap gap-1">
                            {device.features.slice(0, 3).map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {device.features.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{device.features.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            disabled={!canAdd}
                            onClick={() => canAdd && addToCompare(device.id)}
                          >
                            {isSelected ? (
                              "Selected"
                            ) : canAdd ? (
                              <>
                                <Plus className="h-3 w-3 mr-1" />
                                Compare
                              </>
                            ) : (
                              "Max Selected"
                            )}
                          </Button>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {(!devices[category.id as keyof typeof devices] || devices[category.id as keyof typeof devices].length === 0) && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No {category.name.toLowerCase()} available from Cisco
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground">
              Need to decide between devices?
            </h2>
            <p className="text-muted-foreground">
              Jump to Compare to evaluate Cisco devices side-by-side with other vendors.
            </p>
            <Button size="lg" asChild>
              <Link href="/compare">Go to Compare</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
