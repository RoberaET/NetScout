"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, X, GitCompare, Cpu, HardDrive, Zap, Network, Check, AlertCircle } from "lucide-react"

// Mock device data for demonstration
const mockDevices = [
  {
    id: 1,
    name: "Cisco Catalyst 9300-48P",
    vendor: "Cisco",
    type: "Switch",
    cpu: "ARM Cortex-A9 800MHz",
    ram: "4GB",
    throughput: "176 Gbps",
    ports: "48x 1GbE + 4x 10GbE SFP+",
    power: "435W",
    price: "$8,500",
    features: ["StackWise-480", "UPOE+", "DNA Ready", "MACsec"],
  },
  {
    id: 2,
    name: "Huawei S5735-L48P4S-A",
    vendor: "Huawei",
    type: "Switch",
    cpu: "ARM Cortex-A9 600MHz",
    ram: "2GB",
    throughput: "132 Gbps",
    ports: "48x 1GbE + 4x 10GbE SFP+",
    power: "370W",
    price: "$6,200",
    features: ["iStack", "PoE+", "CloudEngine", "Telemetry"],
  },
  {
    id: 3,
    name: "Fortinet FortiGate 200F",
    vendor: "Fortinet",
    type: "Firewall",
    cpu: "NP7 Processor",
    ram: "32GB",
    throughput: "20 Gbps",
    ports: "18x 1GbE + 2x 10GbE SFP+",
    power: "65W",
    price: "$12,000",
    features: ["SD-WAN", "SSL Inspection", "IPS", "Application Control"],
  },
  {
    id: 4,
    name: "Juniper EX4300-48P",
    vendor: "Juniper",
    type: "Switch",
    cpu: "ARM Cortex-A9 800MHz",
    ram: "4GB",
    throughput: "128 Gbps",
    ports: "48x 1GbE + 4x 40GbE QSFP+",
    power: "400W",
    price: "$9,200",
    features: ["Virtual Chassis", "PoE+", "EVPN-VXLAN", "Junos OS"],
  },
  {
    id: 5,
    name: "Cisco ASR 1001-X",
    vendor: "Cisco",
    type: "Router",
    cpu: "Octeon III 1.8GHz",
    ram: "8GB",
    throughput: "20 Gbps",
    ports: "6x 1GbE + 2x 10GbE SFP+",
    power: "250W",
    price: "$15,500",
    features: ["SD-WAN", "MPLS", "BGP", "OSPF"],
  },
]

export default function ComparePage() {
  const [selectedDevices, setSelectedDevices] = useState<typeof mockDevices>([])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDevices = mockDevices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const addDevice = (device: (typeof mockDevices)[0]) => {
    if (selectedDevices.length < 3 && !selectedDevices.find((d) => d.id === device.id)) {
      setSelectedDevices([...selectedDevices, device])
    }
  }

  const removeDevice = (deviceId: number) => {
    setSelectedDevices(selectedDevices.filter((d) => d.id !== deviceId))
  }

  const clearAll = () => {
    setSelectedDevices([])
  }

  // Helper function to highlight differences
  const getValueStyle = (value: string, field: string) => {
    if (selectedDevices.length < 2) return ""

    const values = selectedDevices.map((d) => d[field as keyof typeof d] as string)
    const uniqueValues = [...new Set(values)]

    if (uniqueValues.length === 1) {
      return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950"
    }
    return "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950"
  }

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Compare Devices</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select up to 3 devices to compare their specifications side-by-side. Differences are highlighted
          automatically.
        </p>
      </div>

      {/* Device Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Select Devices to Compare
          </CardTitle>
          <CardDescription>
            Choose up to 3 devices from our database. {selectedDevices.length}/3 selected.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by device name, vendor, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Selected Devices */}
          {selectedDevices.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Selected for Comparison:</h4>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  Clear All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedDevices.map((device) => (
                  <Badge key={device.id} variant="secondary" className="px-3 py-1">
                    {device.name}
                    <button onClick={() => removeDevice(device.id)} className="ml-2 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Available Devices */}
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {filteredDevices.map((device) => {
              const isSelected = selectedDevices.find((d) => d.id === device.id)
              const canAdd = selectedDevices.length < 3 && !isSelected

              return (
                <Card
                  key={device.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : canAdd
                        ? "hover:border-primary hover:shadow-md"
                        : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => canAdd && addDevice(device)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-base">🔹</span>
                          <h4 className="font-medium text-sm">{device.name}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {device.vendor}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {device.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{device.price}</p>
                      </div>
                      {isSelected && <Check className="h-4 w-4 text-primary" />}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      {selectedDevices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitCompare className="h-5 w-5" />
              Device Comparison
            </CardTitle>
            <CardDescription>
              Specifications are compared side-by-side.
              <span className="inline-flex items-center gap-1 ml-2">
                <div className="w-3 h-3 bg-green-100 dark:bg-green-950 rounded"></div>
                <span className="text-xs">Same values</span>
                <div className="w-3 h-3 bg-amber-100 dark:bg-amber-950 rounded ml-2"></div>
                <span className="text-xs">Different values</span>
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Specification</th>
                    {selectedDevices.map((device) => (
                      <th key={device.id} className="text-left py-3 px-4 min-w-[220px]">
                        <div className="space-y-1">
                          <div className="font-medium">{device.name}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-base">🔹</span>
                            <div className="flex gap-1">
                              <Badge variant="outline" className="text-xs">
                                {device.vendor}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {device.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "CPU", field: "cpu", icon: Cpu },
                    { label: "RAM", field: "ram", icon: HardDrive },
                    { label: "Throughput", field: "throughput", icon: Zap },
                    { label: "Ports", field: "ports", icon: Network },
                    { label: "Power", field: "power", icon: AlertCircle },
                    { label: "Price", field: "price", icon: null },
                  ].map((spec) => (
                    <tr key={spec.field} className="border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2 font-medium">
                          {spec.icon && <spec.icon className="h-4 w-4 text-muted-foreground" />}
                          {spec.label}
                        </div>
                      </td>
                      {selectedDevices.map((device) => (
                        <td key={device.id} className="py-3 px-4">
                          <div
                            className={`px-2 py-1 rounded text-sm ${getValueStyle(
                              device[spec.field as keyof typeof device] as string,
                              spec.field,
                            )}`}
                          >
                            {device[spec.field as keyof typeof device] as string}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="py-3 px-4 font-medium">Key Features</td>
                    {selectedDevices.map((device) => (
                      <td key={device.id} className="py-3 px-4">
                        <div className="space-y-1">
                          {device.features.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs mr-1 mb-1">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {selectedDevices.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <GitCompare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Devices Selected</h3>
            <p className="text-muted-foreground mb-4">
              Search and select devices above to start comparing their specifications.
            </p>
            <Button onClick={() => setSearchTerm("")}>Browse All Devices</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
