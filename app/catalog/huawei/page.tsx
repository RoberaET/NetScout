"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Network, Wifi, Shield, Router, ArrowLeft, ExternalLink, Star, Plus, Monitor, Settings, Cpu } from "lucide-react"
import Link from "next/link"

const deviceCategories = [
  { id: "switches", name: "Switches", icon: Network, count: 38 },
  { id: "routers", name: "Routers", icon: Router, count: 25 },
  { id: "firewalls", name: "Firewalls", icon: Shield, count: 22 },
  { id: "access-points", name: "Access Points", icon: Wifi, count: 15 },
  { id: "access-controllers", name: "Access Controllers", icon: Settings, count: 12 },
  { id: "ideahubs", name: "IdeaHubs", icon: Monitor, count: 8 },
  { id: "accessories", name: "Accessories", icon: Cpu, count: 45 },
]

const devices = {
  switches: [
    {
      id: 8,
      name: "S5735-L48P4S-A",
      model: "S5735-L48P4S-A",
      price: "$6,200",
      specs: "48x 1GbE + 4x 10GbE SFP+",
      throughput: "132 Gbps",
      power: "370W",
      features: ["iStack", "PoE+", "CloudEngine", "Telemetry"],
      family: "Enterprise",
      image: "🔴",
    },
    {
      id: 9,
      name: "S6720-30C-EI",
      model: "S6720-30C-EI-32S-AC",
      price: "$12,000",
      specs: "24x 10GbE + 8x 40GbE",
      throughput: "1.2 Tbps",
      power: "500W",
      features: ["VXLAN", "EVPN", "SDN Ready"],
      family: "Data Center",
      image: "🔴",
    },
  ],
  routers: [
    {
      id: 10,
      name: "NE8000 M8",
      model: "NE8000-M8",
      price: "$45,000",
      specs: "400G routing capacity",
      throughput: "25.6 Tbps",
      power: "2000W",
      features: ["SRv6", "MPLS", "SDN", "Telemetry"],
      family: "Service Provider",
      image: "🔴",
    },
  ],
  firewalls: [
    {
      id: 12,
      name: "USG6000E",
      model: "USG6630E-AC",
      price: "$8,500",
      specs: "20 Gbps throughput",
      throughput: "20 Gbps",
      power: "200W",
      features: ["NGFW", "IPS", "Sandbox", "Cloud Security"],
      family: "Enterprise",
      image: "🔴",
    },
  ],
  "access-points": [
    {
      id: 11,
      name: "AirEngine 6761-21",
      model: "AirEngine6761-21",
      price: "$650",
      specs: "Wi-Fi 6, 4x4:4 MIMO",
      throughput: "5.4 Gbps",
      power: "PoE+",
      features: ["Wi-Fi 6", "4x4 MIMO", "Cloud Management"],
      family: "Enterprise",
      image: "🔴",
    },
  ],
  "access-controllers": [
    {
      id: 20,
      name: "AC6605",
      model: "AC6605-26-PWR",
      price: "$3,200",
      specs: "26-port AC controller",
      throughput: "10 Gbps",
      power: "PoE+",
      features: ["AC Controller", "PoE+", "Cloud Management", "SDN Ready"],
      family: "Enterprise",
      image: "🔴",
    },
    {
      id: 21,
      name: "AC6005",
      model: "AC6005-8-PWR",
      price: "$1,800",
      specs: "8-port AC controller",
      throughput: "5 Gbps",
      power: "PoE+",
      features: ["AC Controller", "PoE+", "Cloud Management"],
      family: "SMB",
      image: "🔴",
    },
  ],
  "ideahubs": [
    {
      id: 22,
      name: "IdeaHub S2",
      model: "IdeaHub-S2-65",
      price: "$4,500",
      specs: "65-inch 4K touch display",
      throughput: "N/A",
      power: "AC",
      features: ["4K Display", "Touch Screen", "Video Conferencing", "Whiteboard"],
      family: "Collaboration",
      image: "🔴",
    },
    {
      id: 23,
      name: "IdeaHub Pro",
      model: "IdeaHub-Pro-86",
      price: "$6,800",
      specs: "86-inch 4K touch display",
      throughput: "N/A",
      power: "AC",
      features: ["4K Display", "Touch Screen", "Video Conferencing", "Whiteboard", "AI Features"],
      family: "Enterprise",
      image: "🔴",
    },
  ],
  "accessories": [
    {
      id: 24,
      name: "SFP-10G-LR",
      model: "SFP-10G-LR",
      price: "$180",
      specs: "10G SFP+ LR transceiver",
      throughput: "10 Gbps",
      power: "1W",
      features: ["10G SFP+", "LR Optics", "10km Range"],
      family: "Optics",
      image: "🔴",
    },
    {
      id: 25,
      name: "QSFP-40G-LR4",
      model: "QSFP-40G-LR4",
      price: "$450",
      specs: "40G QSFP+ LR4 transceiver",
      throughput: "40 Gbps",
      power: "3.5W",
      features: ["40G QSFP+", "LR4 Optics", "10km Range"],
      family: "Optics",
      image: "🔴",
    },
    {
      id: 26,
      name: "Power Module 300W",
      model: "PM-300W-AC",
      price: "$320",
      specs: "300W AC power module",
      throughput: "N/A",
      power: "300W",
      features: ["AC Power", "300W", "Hot Swappable"],
      family: "Power",
      image: "🔴",
    },
  ],
}

export default function HuaweiCatalogPage() {
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
              <div className="text-4xl">🔴</div>
              <div>
                <h1 className="text-3xl font-bold">Huawei Devices</h1>
                <p className="text-muted-foreground">Explore Huawei's complete networking portfolio</p>
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
                    No {category.name.toLowerCase()} available from Huawei
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
              Jump to Compare to evaluate Huawei devices side-by-side with other vendors.
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
