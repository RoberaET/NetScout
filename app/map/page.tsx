"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Map, Router, Wifi, Shield, Network, RotateCcw, Download, Trash2 } from "lucide-react"

// Device types for the sidebar
const deviceTypes = [
  { id: "router", name: "Router", icon: Router, color: "bg-blue-500", category: "Network" },
  { id: "switch", name: "Switch", icon: Network, color: "bg-green-500", category: "Network" },
  { id: "firewall", name: "Firewall", icon: Shield, color: "bg-red-500", category: "Security" },
  { id: "access-point", name: "Access Point", icon: Wifi, color: "bg-purple-500", category: "Wireless" },
]

// Connection types
const connectionTypes = [
  { id: "ethernet", name: "Ethernet", color: "#3b82f6", style: "solid" },
  { id: "fiber", name: "Fiber", color: "#f59e0b", style: "dashed" },
  { id: "wireless", name: "Wireless", color: "#8b5cf6", style: "dotted" },
]

interface DroppedDevice {
  id: string
  type: string
  name: string
  x: number
  y: number
  icon: any
  color: string
}

interface Connection {
  id: string
  from: string
  to: string
  type: string
  color: string
  style: string
}

export default function MapPage() {
  const [droppedDevices, setDroppedDevices] = useState<DroppedDevice[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [draggedDevice, setDraggedDevice] = useState<any>(null)
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
  const [connectionMode, setConnectionMode] = useState<string | null>(null)
  const [connectionStart, setConnectionStart] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleDragStart = (device: any) => {
    setDraggedDevice(device)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (!draggedDevice || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newDevice: DroppedDevice = {
      id: `${draggedDevice.id}-${Date.now()}`,
      type: draggedDevice.id,
      name: `${draggedDevice.name} ${droppedDevices.filter((d) => d.type === draggedDevice.id).length + 1}`,
      x: Math.max(50, Math.min(x - 25, rect.width - 75)),
      y: Math.max(50, Math.min(y - 25, rect.height - 75)),
      icon: draggedDevice.icon,
      color: draggedDevice.color,
    }

    setDroppedDevices([...droppedDevices, newDevice])
    setDraggedDevice(null)
  }

  const handleDeviceClick = (deviceId: string) => {
    if (connectionMode && connectionStart) {
      // Complete connection
      if (connectionStart !== deviceId) {
        const newConnection: Connection = {
          id: `conn-${Date.now()}`,
          from: connectionStart,
          to: deviceId,
          type: connectionMode,
          color: connectionTypes.find((t) => t.id === connectionMode)?.color || "#3b82f6",
          style: connectionTypes.find((t) => t.id === connectionMode)?.style || "solid",
        }
        setConnections([...connections, newConnection])
      }
      setConnectionStart(null)
      setConnectionMode(null)
    } else if (connectionMode) {
      // Start connection
      setConnectionStart(deviceId)
    } else {
      // Select device
      setSelectedDevice(selectedDevice === deviceId ? null : deviceId)
    }
  }

  const startConnection = (type: string) => {
    setConnectionMode(type)
    setConnectionStart(null)
    setSelectedDevice(null)
  }

  const deleteDevice = (deviceId: string) => {
    setDroppedDevices(droppedDevices.filter((d) => d.id !== deviceId))
    setConnections(connections.filter((c) => c.from !== deviceId && c.to !== deviceId))
    setSelectedDevice(null)
  }

  const deleteConnection = (connectionId: string) => {
    setConnections(connections.filter((c) => c.id !== connectionId))
  }

  const resetCanvas = () => {
    setDroppedDevices([])
    setConnections([])
    setSelectedDevice(null)
    setConnectionMode(null)
    setConnectionStart(null)
  }

  const exportTopology = () => {
    const topology = {
      devices: droppedDevices,
      connections: connections,
      timestamp: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(topology, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "network-topology.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const getDevicePosition = (deviceId: string) => {
    const device = droppedDevices.find((d) => d.id === deviceId)
    return device ? { x: device.x + 25, y: device.y + 25 } : { x: 0, y: 0 }
  }

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-80 border-r bg-background p-6 overflow-y-auto">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Network Map</h1>
            <p className="text-sm text-muted-foreground">
              Drag devices to the canvas and connect them to create your network topology.
            </p>
          </div>

          {/* Device Library */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Device Library</CardTitle>
              <CardDescription>Drag devices to the canvas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {deviceTypes.map((device) => (
                <div
                  key={device.id}
                  draggable
                  onDragStart={() => handleDragStart(device)}
                  className="flex items-center gap-3 p-3 rounded-lg border cursor-move hover:bg-muted transition-colors"
                >
                  <div className={`p-2 rounded ${device.color} text-white`}>
                    <device.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{device.name}</div>
                    <div className="text-xs text-muted-foreground">{device.category}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Connection Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Connection Tools</CardTitle>
              <CardDescription>
                {connectionMode ? "Click devices to connect" : "Select connection type"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {connectionTypes.map((conn) => (
                <Button
                  key={conn.id}
                  variant={connectionMode === conn.id ? "default" : "outline"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => startConnection(conn.id)}
                >
                  <div
                    className="w-4 h-0.5 mr-2"
                    style={{
                      backgroundColor: conn.color,
                      borderStyle: conn.style === "solid" ? "none" : conn.style,
                      borderWidth: conn.style !== "solid" ? "1px 0" : "0",
                      borderColor: conn.color,
                    }}
                  />
                  {conn.name}
                </Button>
              ))}
              {connectionMode && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setConnectionMode(null)
                    setConnectionStart(null)
                  }}
                >
                  Cancel Connection
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start bg-transparent"
                onClick={resetCanvas}
                disabled={droppedDevices.length === 0}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Canvas
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start bg-transparent"
                onClick={exportTopology}
                disabled={droppedDevices.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Topology
              </Button>
            </CardContent>
          </Card>

          {/* Device List */}
          {droppedDevices.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Devices on Canvas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {droppedDevices.map((device) => (
                  <div
                    key={device.id}
                    className={`flex items-center justify-between p-2 rounded border cursor-pointer transition-colors ${
                      selectedDevice === device.id ? "bg-primary/10 border-primary" : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedDevice(device.id)}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded ${device.color} text-white`}>
                        <device.icon className="h-3 w-3" />
                      </div>
                      <span className="text-sm font-medium">{device.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteDevice(device.id)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 relative bg-muted/20">
        <div
          ref={canvasRef}
          className="w-full h-full relative overflow-hidden"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          {/* Status Bar */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">{droppedDevices.length} devices</Badge>
              <Badge variant="secondary">{connections.length} connections</Badge>
              {connectionMode && (
                <Badge variant="default">
                  Connecting with {connectionTypes.find((t) => t.id === connectionMode)?.name}
                </Badge>
              )}
            </div>
          </div>

          {/* Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {connections.map((connection) => {
              const fromPos = getDevicePosition(connection.from)
              const toPos = getDevicePosition(connection.to)
              return (
                <g key={connection.id}>
                  <line
                    x1={fromPos.x}
                    y1={fromPos.y}
                    x2={toPos.x}
                    y2={toPos.y}
                    stroke={connection.color}
                    strokeWidth="2"
                    strokeDasharray={
                      connection.style === "dashed" ? "5,5" : connection.style === "dotted" ? "2,2" : "none"
                    }
                  />
                  {/* Connection delete button */}
                  <circle
                    cx={(fromPos.x + toPos.x) / 2}
                    cy={(fromPos.y + toPos.y) / 2}
                    r="8"
                    fill="white"
                    stroke={connection.color}
                    strokeWidth="2"
                    className="cursor-pointer pointer-events-auto"
                    onClick={() => deleteConnection(connection.id)}
                  />
                  <text
                    x={(fromPos.x + toPos.x) / 2}
                    y={(fromPos.y + toPos.y) / 2 + 1}
                    textAnchor="middle"
                    fontSize="10"
                    fill={connection.color}
                    className="cursor-pointer pointer-events-auto"
                    onClick={() => deleteConnection(connection.id)}
                  >
                    ×
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Devices */}
          {droppedDevices.map((device) => (
            <div
              key={device.id}
              className={`absolute w-12 h-12 rounded-lg border-2 cursor-pointer transition-all ${
                selectedDevice === device.id
                  ? "border-primary shadow-lg scale-110"
                  : connectionStart === device.id
                    ? "border-yellow-500 shadow-md"
                    : "border-white shadow-sm hover:shadow-md"
              } ${device.color} text-white flex items-center justify-center`}
              style={{
                left: device.x,
                top: device.y,
              }}
              onClick={() => handleDeviceClick(device.id)}
              title={device.name}
            >
              <device.icon className="h-6 w-6" />
            </div>
          ))}

          {/* Empty State */}
          {droppedDevices.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Map className="h-16 w-16 text-muted-foreground mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">Start Building Your Network</h3>
                  <p className="text-muted-foreground max-w-md">
                    Drag devices from the sidebar to this canvas, then connect them to create your network topology.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
