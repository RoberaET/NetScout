"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Network, Wifi, Shield, Router, ArrowLeft, ExternalLink, Star, Plus, Monitor, Settings, Cpu } from "lucide-react"
import Link from "next/link"

const deviceCategories = [
  { id: "routers", name: "Routers", icon: Router, count: 28 },
  { id: "switches", name: "Switches", icon: Network, count: 35 },
  { id: "firewalls", name: "Firewalls", icon: Shield, count: 18 },
  { id: "access-points", name: "Access Points", icon: Wifi, count: 12 },
  { id: "access-controllers", name: "Access Controllers", icon: Settings, count: 8 },
  { id: "ideahubs", name: "IdeaHubs", icon: Monitor, count: 3 },
  { id: "accessories", name: "Accessories", icon: Cpu, count: 35 },
]

const devices = {
  routers: [
    {
      id: 17,
      name: "MX204",
      model: "MX204-HWBASE-AC-FS",
      price: "$28,000",
      specs: "400 Gbps capacity",
      throughput: "400 Gbps",
      power: "500W",
      features: ["MPLS", "EVPN", "SDN", "Telemetry"],
      family: "Service Provider",
      image: "🟢",
    },
    {
      id: 18,
      name: "SRX300",
      model: "SRX300-SYS-JB",
      price: "$1,200",
      specs: "1 Gbps firewall throughput",
      throughput: "1 Gbps",
      power: "25W",
      features: ["NGFW", "VPN", "IPS"],
      family: "SMB",
      image: "🟢",
    },
  ],
  switches: [
    {
      id: 19,
      name: "EX4300-48P",
      model: "EX4300-48P",
      price: "$9,200",
      specs: "48x 1GbE + 4x 40GbE QSFP+",
      throughput: "128 Gbps",
      power: "400W",
      features: ["Virtual Chassis", "PoE+", "EVPN-VXLAN", "Junos OS"],
      family: "Enterprise",
      image: "🟢",
    },
  ],
  firewalls: [
    {
      id: 20,
      name: "SRX4600",
      model: "SRX4600-SYS-JB-AC",
      price: "$35,000",
      specs: "40 Gbps throughput",
      throughput: "40 Gbps",
      power: "800W",
      features: ["NGFW", "IPS", "Sandbox", "SD-WAN"],
      family: "Enterprise",
      image: "🟢",
    },
  ],
  "access-points": [
    {
      id: 21,
      name: "Mist AP43",
      model: "AP43",
      price: "$750",
      specs: "Wi-Fi 6, 4x4:4 MIMO",
      throughput: "4.8 Gbps",
      power: "PoE+",
      features: ["Wi-Fi 6", "4x4 MIMO", "Mist AI", "Cloud Management"],
      family: "Enterprise",
      image: "🟢",
    },
    {
      id: 22,
      name: "Mist AP41",
      model: "AP41",
      price: "$450",
      specs: "Wi-Fi 6, 2x2:2 MIMO",
      throughput: "1.2 Gbps",
      power: "PoE+",
      features: ["Wi-Fi 6", "2x2 MIMO", "Mist AI", "Cloud Management"],
      family: "SMB",
      image: "🟢",
    },
  ],
  "access-controllers": [
    {
      id: 23,
      name: "Mist Edge",
      model: "ME-1000",
      price: "$2,500",
      specs: "Mist Edge appliance",
      throughput: "10 Gbps",
      power: "AC",
      features: ["Mist Edge", "Cloud Management", "AI Analytics", "SD-WAN"],
      family: "Enterprise",
      image: "🟢",
    },
  ],
  "ideahubs": [
    {
      id: 24,
      name: "Juniper Board 65",
      model: "JB-65",
      price: "$4,800",
      specs: "65-inch network display",
      throughput: "N/A",
      power: "AC",
      features: ["Network Display", "Touch Screen", "Juniper Integration"],
      family: "Network",
      image: "🟢",
    },
  ],
  "accessories": [
    {
      id: 25,
      name: "SFP-10G-LR",
      model: "SFP-10G-LR",
      price: "$200",
      specs: "10G SFP+ LR transceiver",
      throughput: "10 Gbps",
      power: "1W",
      features: ["10G SFP+", "LR Optics", "10km Range"],
      family: "Optics",
      image: "🟢",
    },
    {
      id: 26,
      name: "Power Supply 1000W",
      model: "PS-1000W-AC",
      price: "$600",
      specs: "1000W AC power supply",
      throughput: "N/A",
      power: "1000W",
      features: ["AC Power", "1000W", "Hot Swappable", "Redundant"],
      family: "Power",
      image: "🟢",
    },
  ],
}

export default function JuniperCatalogPage() {
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
              <div className="text-4xl">🟢</div>
              <div>
                <h1 className="text-3xl font-bold">Juniper Devices</h1>
                <p className="text-muted-foreground">Explore Juniper's high-performance networking portfolio</p>
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
        <Tabs defaultValue="routers" className="w-full">
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
                    No {category.name.toLowerCase()} available from Juniper
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
              Jump to Compare to evaluate Juniper devices side-by-side with other vendors.
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
