'use client'

import { useState } from 'react'
import { BarChart3, TrendingUp, DollarSign, Users, ShoppingCart, Target, Calendar, ArrowUp, ArrowDown, Eye, MousePointer, CreditCard } from 'lucide-react'

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  // Mock data for dashboard
  const dashboardData = {
    overview: {
      totalRevenue: 125430.50,
      totalOrders: 1247,
      conversionRate: 3.2,
      avgOrderValue: 100.67,
      visitors: 38750,
      clicks: 12470,
      impressions: 245000
    },
    trafficCosts: {
      facebook: { spend: 2500, conversions: 45, cpa: 55.56 },
      google: { spend: 1800, conversions: 32, cpa: 56.25 },
      tiktok: { spend: 1200, conversions: 28, cpa: 42.86 },
      total: { spend: 5500, conversions: 105, cpa: 52.38 }
    },
    salesByPeriod: [
      { period: 'Jan', revenue: 8500, orders: 85 },
      { period: 'Fev', revenue: 9200, orders: 92 },
      { period: 'Mar', revenue: 11800, orders: 118 },
      { period: 'Abr', revenue: 15200, orders: 152 },
      { period: 'Mai', revenue: 18900, orders: 189 },
      { period: 'Jun', revenue: 21800, orders: 218 }
    ],
    topProducts: [
      { name: "Smartphone Galaxy S24", sales: 45, revenue: 269995.55, growth: 12.5 },
      { name: "Curso Marketing Digital", sales: 156, revenue: 46332.00, growth: 8.3 },
      { name: "Notebook Dell", sales: 23, revenue: 80499.77, growth: -2.1 },
      { name: "Fone Sony WH-1000XM5", sales: 67, revenue: 127299.33, growth: 15.7 },
      { name: "Kit Maquiagem", sales: 34, revenue: 10199.66, growth: 5.2 }
    ],
    conversionFunnel: {
      visitors: 38750,
      productViews: 12470,
      addToCart: 2489,
      checkout: 1244,
      purchases: 1247
    }
  }

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard de Vendas</h1>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Últimos 7 dias</option>
                <option value="30d">Últimos 30 dias</option>
                <option value="90d">Últimos 90 dias</option>
                <option value="1y">Último ano</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Receita Total</p>
                <p className="text-2xl font-bold text-green-600">
                  R$ {dashboardData.overview.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500 ml-1">+12.5%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Pedidos</p>
                <p className="text-2xl font-bold text-blue-600">{dashboardData.overview.totalOrders}</p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500 ml-1">+8.3%</span>
                </div>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taxa de Conversão</p>
                <p className="text-2xl font-bold text-purple-600">{dashboardData.overview.conversionRate}%</p>
                <div className="flex items-center mt-1">
                  <ArrowDown className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-500 ml-1">-2.1%</span>
                </div>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ticket Médio</p>
                <p className="text-2xl font-bold text-orange-600">
                  R$ {dashboardData.overview.avgOrderValue.toFixed(2)}
                </p>
                <div className="flex items-center mt-1">
                  <ArrowUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500 ml-1">+5.2%</span>
                </div>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Traffic and Costs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Traffic Metrics */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Métricas de Tráfego</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Eye className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-gray-600">Visitantes</span>
                </div>
                <span className="font-semibold">{dashboardData.overview.visitors.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MousePointer className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Cliques</span>
                </div>
                <span className="font-semibold">{dashboardData.overview.clicks.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-gray-600">Impressões</span>
                </div>
                <span className="font-semibold">{dashboardData.overview.impressions.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Traffic Costs */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Custos por Plataforma</h3>
            <div className="space-y-4">
              {Object.entries(dashboardData.trafficCosts).map(([platform, data]) => (
                platform !== 'total' && (
                  <div key={platform} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium capitalize">{platform}</p>
                      <p className="text-sm text-gray-600">{data.conversions} conversões</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">R$ {data.spend.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">CPA: R$ {data.cpa.toFixed(2)}</p>
                    </div>
                  </div>
                )
              ))}
              <div className="border-t pt-3 flex items-center justify-between">
                <span className="font-semibold">Total Investido</span>
                <span className="text-lg font-bold text-green-600">
                  R$ {dashboardData.trafficCosts.total.spend.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Chart and Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales by Period */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Vendas por Período</h3>
            <div className="space-y-3">
              {dashboardData.salesByPeriod.map((item) => (
                <div key={item.period} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.period}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{item.orders} pedidos</span>
                    <span className="font-semibold">R$ {item.revenue.toLocaleString('pt-BR')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Top Produtos</h3>
            <div className="space-y-4">
              {dashboardData.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                    <p className="text-xs text-gray-600">{product.sales} vendas</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      R$ {product.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <div className="flex items-center">
                      {product.growth > 0 ? (
                        <ArrowUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-red-500" />
                      )}
                      <span className={`text-xs ml-1 ${product.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {Math.abs(product.growth)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-6">Funil de Conversão</h3>
          <div className="space-y-4">
            {[
              { stage: 'Visitantes', value: dashboardData.conversionFunnel.visitors, icon: Eye },
              { stage: 'Visualizações', value: dashboardData.conversionFunnel.productViews, icon: Target },
              { stage: 'Carrinho', value: dashboardData.conversionFunnel.addToCart, icon: ShoppingCart },
              { stage: 'Checkout', value: dashboardData.conversionFunnel.checkout, icon: CreditCard },
              { stage: 'Compras', value: dashboardData.conversionFunnel.purchases, icon: Check }
            ].map((step, index) => {
              const Icon = step.icon
              const rate = index === 0 ? 100 : (step.value / dashboardData.conversionFunnel.visitors) * 100
              return (
                <div key={step.stage} className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{step.stage}</span>
                      <span className="text-sm text-gray-600">{rate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${rate}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 mt-1 block">{step.value.toLocaleString()}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}