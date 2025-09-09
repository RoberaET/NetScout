"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown, ArrowRight } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for individual engineers and small teams",
    price: { monthly: 10, yearly: 100 },
    icon: Zap,
    color: "from-blue-500 to-blue-600",
    features: [
      "Up to 100 device searches per month",
      "Basic device comparison (2 devices)",
      "Access to 5 major vendors",
      "Email support",
      "Basic network mapping",
      "Export to PDF",
    ],
    limitations: [
      "Limited to 2 concurrent users",
      "No API access",
      "Basic reporting only",
    ],
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for growing teams and medium enterprises",
    price: { monthly: 29, yearly: 290 },
    icon: Star,
    color: "from-amber-500 to-amber-600",
    features: [
      "Up to 1,000 device searches per month",
      "Advanced device comparison (up to 5 devices)",
      "Access to 15+ major vendors",
      "Priority email support",
      "Advanced network mapping",
      "Export to PDF, Excel, CSV",
      "Custom device categories",
      "Team collaboration tools",
      "Advanced filtering & search",
    ],
    limitations: [
      "Up to 10 concurrent users",
      "Limited API access (100 calls/month)",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with advanced needs",
    price: { monthly: 99, yearly: 990 },
    icon: Crown,
    color: "from-purple-500 to-purple-600",
    features: [
      "Unlimited device searches",
      "Unlimited device comparisons",
      "Access to all 50+ vendors",
      "24/7 phone & email support",
      "Advanced network topology mapping",
      "All export formats + API access",
      "Custom integrations",
      "Unlimited team members",
      "Advanced analytics & reporting",
      "White-label options",
      "Dedicated account manager",
      "Custom training sessions",
    ],
    limitations: [],
    popular: false,
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl text-foreground">
              Choose Your
              <span className="text-primary"> Perfect Plan</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Start with our free tier and scale as your network grows. All plans include our core features with no hidden fees.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>
                Monthly
              </span>
              <button
                onClick={toggleBillingCycle}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground"}`}>
                Yearly
                <Badge variant="secondary" className="ml-2 text-xs">
                  Save 17%
                </Badge>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon
              const isPopular = plan.popular
              const discount = billingCycle === "yearly" ? 0.17 : 0
              const finalPrice = Math.round(plan.price[billingCycle] * (1 - discount))
              
              return (
                <Card
                  key={plan.id}
                  className={`relative hover-lift transition-all duration-300 ${
                    isPopular
                      ? "border-primary shadow-lg scale-105"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center space-y-4 pb-8">
                    <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${plan.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {plan.description}
                      </CardDescription>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-foreground">${finalPrice}</span>
                        <span className="text-muted-foreground ml-1">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                      </div>
                      {billingCycle === "yearly" && (
                        <p className="text-sm text-muted-foreground">
                          ${plan.price.monthly}/mo billed annually
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <Button
                      className={`w-full ${
                        isPopular
                          ? "bg-primary hover:bg-primary/90"
                          : "bg-secondary hover:bg-secondary/90"
                      }`}
                      size="lg"
                    >
                      {isPopular ? "Start Free Trial" : "Get Started"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">What's included:</h4>
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-3">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, limitationIndex) => (
                            <li key={limitationIndex} className="flex items-start space-x-3">
                              <span className="text-muted-foreground text-sm">• {limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Everything you need to know about our pricing and plans
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Can I change plans anytime?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Is there a free trial?</h3>
                  <p className="text-sm text-muted-foreground">
                    All plans come with a 14-day free trial. No credit card required to start.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">What payment methods do you accept?</h3>
                  <p className="text-sm text-muted-foreground">
                    We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Can I cancel anytime?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, you can cancel your subscription at any time. No cancellation fees or long-term contracts.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Do you offer custom plans?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, we offer custom Enterprise plans for organizations with specific needs. Contact us for details.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Is my data secure?</h3>
                  <p className="text-sm text-muted-foreground">
                    Absolutely. We use enterprise-grade security and are SOC 2 compliant. Your data is encrypted and protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary-foreground">
              Ready to streamline your network device discovery?
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Join thousands of network engineers who trust NetScout for their device research and comparison needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
