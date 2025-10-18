'use client'

import { useState } from 'react'
import { ShoppingCart, Star, Truck, Package, BarChart3, TrendingUp, DollarSign, Users, Check, X, Plus, Minus, Eye, Heart } from 'lucide-react'

interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  category: string
  type: 'digital' | 'physical'
  stock: number
  weight?: number
  dimensions?: string
  features: string[]
}

interface CartItem extends Product {
  quantity: number
}

const products: Product[] = [
  {
    id: 1,
    name: "Smartphone Galaxy S24 Ultra",
    description: "O smartphone mais avançado da Samsung com câmera de 200MP e processador Snapdragon 8 Gen 3.",
    price: 5999.99,
    originalPrice: 6999.99,
    rating: 4.8,
    reviews: 1247,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
    category: "Eletrônicos",
    type: "physical",
    stock: 50,
    weight: 0.23,
    dimensions: "16.2 x 7.9 x 0.8 cm",
    features: ["Câmera 200MP", "Tela 6.8\"", "Bateria 5000mAh", "5G"]
  },
  {
    id: 2,
    name: "Curso Completo de Marketing Digital",
    description: "Aprenda todas as estratégias de marketing digital do zero até profissional.",
    price: 297.00,
    originalPrice: 497.00,
    rating: 4.9,
    reviews: 3256,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    category: "Cursos",
    type: "digital",
    stock: 999,
    features: ["120 aulas", "Certificado", "Acesso vitalício", "Suporte 24/7"]
  },
  {
    id: 3,
    name: "Notebook Dell Inspiron 15",
    description: "Notebook potente para trabalho e estudos com processador Intel Core i5.",
    price: 3499.99,
    originalPrice: 3999.99,
    rating: 4.6,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
    category: "Eletrônicos",
    type: "physical",
    stock: 25,
    weight: 2.1,
    dimensions: "35.8 x 23.5 x 1.8 cm",
    features: ["Intel Core i5", "8GB RAM", "SSD 512GB", "Tela 15.6\""]
  },
  {
    id: 4,
    name: "E-book: Receitas Low Carb",
    description: "Mais de 100 receitas deliciosas e saudáveis para dieta low carb.",
    price: 29.90,
    rating: 4.7,
    reviews: 1543,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    category: "Livros",
    type: "digital",
    stock: 999,
    features: ["100+ receitas", "PDF + ePub", "Fácil preparo", "Calorias calculadas"]
  },
  {
    id: 5,
    name: "Fone de Ouvido Bluetooth Sony WH-1000XM5",
    description: "Fone wireless com cancelamento de ruído ativo e bateria de 30 horas.",
    price: 1899.99,
    originalPrice: 2299.99,
    rating: 4.8,
    reviews: 2156,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    category: "Eletrônicos",
    type: "physical",
    stock: 75,
    weight: 0.25,
    dimensions: "25 x 19 x 7 cm",
    features: ["Cancelamento de ruído", "30h bateria", "Bluetooth 5.2", "Controle touch"]
  },
  {
    id: 6,
    name: "Kit de Maquiagem Profissional",
    description: "Kit completo com 50 produtos para maquiagem profissional e iniciante.",
    price: 299.99,
    originalPrice: 499.99,
    rating: 4.5,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop",
    category: "Beleza",
    type: "physical",
    stock: 40,
    weight: 1.5,
    dimensions: "30 x 20 x 10 cm",
    features: ["50 produtos", "Marcas premium", "Pincéis inclusos", "Estojo profissional"]
  }
]

export default function SalesFunnelApp() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [favorites, setFavorites] = useState<number[]>([])

  const addToCart = (product: Product) => {
    if (product.stock <= 0) return
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        if (existing.quantity >= product.stock) return prev
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    const product = products.find(p => p.id === productId)
    if (product && quantity > product.stock) return
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const toggleFavorite = (productId: number) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory
    const typeMatch = selectedType === 'all' || product.type === selectedType
    return categoryMatch && typeMatch
  })

  const handlePurchase = () => {
    alert(`Compra realizada com sucesso! Total: R$ ${getTotalPrice().toFixed(2)}`)
    setCart([])
    setShowCheckout(false)
    setShowCart(false)
  }

  // Mock sales data for dashboard preview
  const salesData = {
    totalRevenue: 125430.50,
    totalOrders: 1247,
    conversionRate: 3.2,
    avgOrderValue: 100.67,
    topProducts: [
      { name: "Smartphone Galaxy S24", sales: 45, revenue: 269995.55 },
      { name: "Curso Marketing Digital", sales: 156, revenue: 46332.00 },
      { name: "Notebook Dell", sales: 23, revenue: 80499.77 }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">SalesFunnel</h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-600 transition-colors">
                <BarChart3 className="w-6 h-6" />
              </button>
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Vendas Otimizadas
            <span className="block">para Tráfego Pago</span>
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Plataforma completa para e-commerce com produtos digitais e físicos.
            Aumente suas conversões com funis otimizados e analytics avançados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{salesData.conversionRate}%</div>
              <div className="text-sm opacity-75">Taxa de Conversão</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">R$ {salesData.avgOrderValue.toFixed(2)}</div>
              <div className="text-sm opacity-75">Ticket Médio</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{salesData.totalOrders}</div>
              <div className="text-sm opacity-75">Vendas Totais</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Todas as categorias</option>
              <option value="Eletrônicos">Eletrônicos</option>
              <option value="Cursos">Cursos</option>
              <option value="Livros">Livros</option>
              <option value="Beleza">Beleza</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Todos os tipos</option>
              <option value="digital">Digital</option>
              <option value="physical">Físico</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.type === 'digital' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                    }`}>
                      {product.type === 'digital' ? 'Digital' : 'Físico'}
                    </div>
                    {product.originalPrice && (
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-green-600 font-medium">{product.category}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating} ({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    {product.type === 'physical' ? (
                      <>
                        <div className="flex items-center space-x-1">
                          <Truck className="w-4 h-4" />
                          <span>Frete grátis</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Package className="w-4 h-4" />
                          <span>{product.stock} em estoque</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>Download imediato</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{product.stock}+ disponíveis</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock <= 0}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {product.stock > 0 ? 'Comprar' : 'Esgotado'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sales Summary Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">Resumo de Vendas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Receita Total</p>
                  <p className="text-2xl font-bold text-green-600">R$ {salesData.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Pedidos</p>
                  <p className="text-2xl font-bold text-blue-600">{salesData.totalOrders}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Taxa de Conversão</p>
                  <p className="text-2xl font-bold text-purple-600">{salesData.conversionRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ticket Médio</p>
                  <p className="text-2xl font-bold text-orange-600">R$ {salesData.avgOrderValue.toFixed(2)}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
            <h4 className="text-xl font-bold mb-4">Top Produtos</h4>
            <div className="space-y-4">
              {salesData.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} vendas</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">R$ {product.revenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCart(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold">Carrinho ({getTotalItems()})</h3>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Seu carrinho está vazio</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                        <p className="text-green-600 font-semibold">R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-green-600">
                    R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium"
                >
                  Finalizar Compra
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowCheckout(false)} />
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Finalizar Compra</h3>
              <p className="text-gray-600">Confirme sua compra de {getTotalItems()} produto(s)</p>
            </div>

            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{item.name} (x{item.quantity})</span>
                  <span className="font-medium">R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="text-xl font-bold text-green-600">R$ {getTotalPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handlePurchase}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}