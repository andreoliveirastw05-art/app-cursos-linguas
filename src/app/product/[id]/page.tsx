'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Star, Truck, Package, Shield, RotateCcw, Heart, ShoppingCart, ArrowLeft, Check, Plus, Minus } from 'lucide-react'

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
  longDescription: string
  specifications: { [key: string]: string }
}

const products: Product[] = [
  {
    id: 1,
    name: "Smartphone Galaxy S24 Ultra",
    description: "O smartphone mais avançado da Samsung com câmera de 200MP e processador Snapdragon 8 Gen 3.",
    longDescription: "Experimente o futuro da fotografia móvel com o Galaxy S24 Ultra. Equipado com uma câmera principal de 200MP, este dispositivo captura imagens incríveis em qualquer condição de iluminação. O processador Snapdragon 8 Gen 3 garante desempenho excepcional para jogos, edição de vídeo e multitarefas. Com bateria de 5000mAh, você tem autonomia para o dia todo.",
    price: 5999.99,
    originalPrice: 6999.99,
    rating: 4.8,
    reviews: 1247,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=400&fit=crop",
    category: "Eletrônicos",
    type: "physical",
    stock: 50,
    weight: 0.23,
    dimensions: "16.2 x 7.9 x 0.8 cm",
    features: ["Câmera 200MP", "Tela 6.8\"", "Bateria 5000mAh", "5G"],
    specifications: {
      "Processador": "Snapdragon 8 Gen 3",
      "RAM": "12GB",
      "Armazenamento": "256GB",
      "Tela": "6.8\" Dynamic AMOLED 2X",
      "Câmera Principal": "200MP + 50MP + 12MP + 10MP",
      "Bateria": "5000mAh",
      "SO": "Android 14"
    }
  },
  {
    id: 2,
    name: "Curso Completo de Marketing Digital",
    description: "Aprenda todas as estratégias de marketing digital do zero até profissional.",
    longDescription: "Domine o marketing digital com nosso curso completo e abrangente. Desde os fundamentos até estratégias avançadas, você aprenderá tudo que precisa para se tornar um profissional de marketing digital. Inclui módulos sobre SEO, Google Ads, Facebook Ads, conteúdo, email marketing, analytics e muito mais.",
    price: 297.00,
    originalPrice: 497.00,
    rating: 4.9,
    reviews: 3256,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "Cursos",
    type: "digital",
    stock: 999,
    features: ["120 aulas", "Certificado", "Acesso vitalício", "Suporte 24/7"],
    specifications: {
      "Duração": "40 horas",
      "Aulas": "120 vídeo-aulas",
      "Idioma": "Português",
      "Certificado": "Digital válido",
      "Acesso": "Vitalício",
      "Suporte": "24/7 via chat"
    }
  },
  {
    id: 3,
    name: "Notebook Dell Inspiron 15",
    description: "Notebook potente para trabalho e estudos com processador Intel Core i5.",
    longDescription: "O Dell Inspiron 15 é perfeito para trabalho, estudos e entretenimento. Equipado com processador Intel Core i5 de 12ª geração, 8GB de RAM e SSD de 512GB, oferece desempenho excepcional para multitarefas. A tela de 15.6\" Full HD garante imagens nítidas e cores vibrantes.",
    price: 3499.99,
    originalPrice: 3999.99,
    rating: 4.6,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop",
    category: "Eletrônicos",
    type: "physical",
    stock: 25,
    weight: 2.1,
    dimensions: "35.8 x 23.5 x 1.8 cm",
    features: ["Intel Core i5", "8GB RAM", "SSD 512GB", "Tela 15.6\""],
    specifications: {
      "Processador": "Intel Core i5-1235U",
      "RAM": "8GB DDR4",
      "Armazenamento": "SSD 512GB",
      "Tela": "15.6\" Full HD",
      "Gráficos": "Intel Iris Xe",
      "Bateria": "3 células",
      "SO": "Windows 11 Home"
    }
  },
  {
    id: 4,
    name: "E-book: Receitas Low Carb",
    description: "Mais de 100 receitas deliciosas e saudáveis para dieta low carb.",
    longDescription: "Descubra o prazer de comer saudável com nosso e-book completo de receitas low carb. Mais de 100 receitas testadas e aprovadas, desde entradas até sobremesas, todas com baixo teor de carboidratos. Inclui tabelas nutricionais, dicas de substituição e planejamento semanal.",
    price: 29.90,
    rating: 4.7,
    reviews: 1543,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
    category: "Livros",
    type: "digital",
    stock: 999,
    features: ["100+ receitas", "PDF + ePub", "Fácil preparo", "Calorias calculadas"],
    specifications: {
      "Formato": "PDF + ePub",
      "Páginas": "150",
      "Receitas": "100+",
      "Idioma": "Português",
      "Atualizações": "Grátis por 1 ano"
    }
  },
  {
    id: 5,
    name: "Fone de Ouvido Bluetooth Sony WH-1000XM5",
    description: "Fone wireless com cancelamento de ruído ativo e bateria de 30 horas.",
    longDescription: "Experimente áudio premium com o Sony WH-1000XM5. Com cancelamento de ruído ativo líder do setor, você pode se concentrar no que importa. A bateria de 30 horas garante que você tenha música o dia todo. Conectividade Bluetooth 5.2 e controles touch intuitivos.",
    price: 1899.99,
    originalPrice: 2299.99,
    rating: 4.8,
    reviews: 2156,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
    category: "Eletrônicos",
    type: "physical",
    stock: 75,
    weight: 0.25,
    dimensions: "25 x 19 x 7 cm",
    features: ["Cancelamento de ruído", "30h bateria", "Bluetooth 5.2", "Controle touch"],
    specifications: {
      "Tipo": "Over-ear",
      "Conectividade": "Bluetooth 5.2",
      "Bateria": "30h (ANC ligado)",
      "Cancelamento": "Ruído ativo",
      "Peso": "250g",
      "Compatibilidade": "iOS/Android/PC"
    }
  },
  {
    id: 6,
    name: "Kit de Maquiagem Profissional",
    description: "Kit completo com 50 produtos para maquiagem profissional e iniciante.",
    longDescription: "Tenha tudo que precisa para criar looks incríveis com nosso kit profissional de maquiagem. 50 produtos de alta qualidade, incluindo bases, corretivos, sombras, blush, batons e muito mais. Ideal para profissionais e entusiastas da maquiagem.",
    price: 299.99,
    originalPrice: 499.99,
    rating: 4.5,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop",
    category: "Beleza",
    type: "physical",
    stock: 40,
    weight: 1.5,
    dimensions: "30 x 20 x 10 cm",
    features: ["50 produtos", "Marcas premium", "Pincéis inclusos", "Estojo profissional"],
    specifications: {
      "Produtos": "50 itens",
      "Marcas": "Premium",
      "Pincéis": "15 pincéis profissionais",
      "Estojo": "Resistente à água",
      "Peso": "1.5kg",
      "Dimensões": "30x20x10cm"
    }
  }
]

export default function ProductDetailPage() {
  const params = useParams()
  const productId = parseInt(params.id as string)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const product = products.find(p => p.id === productId)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
          <a href="/" className="text-blue-600 hover:text-blue-800">Voltar à loja</a>
        </div>
      </div>
    )
  }

  const addToCart = () => {
    // Mock add to cart functionality
    alert(`${product.name} adicionado ao carrinho!`)
  }

  const buyNow = () => {
    // Mock buy now functionality
    alert(`Redirecionando para checkout de ${product.name}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <h1 className="text-lg font-bold text-gray-900">SalesFunnel</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[product.image, product.image, product.image, product.image].map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-green-600 font-medium">{product.category}</span>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                </button>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} avaliações)</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-gray-900">
                R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
              {product.originalPrice && (
                <span className="text-2xl text-gray-500 line-through">
                  R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
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
                    <Check className="w-4 h-4" />
                    <span>Download imediato</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>Garantia vitalícia</span>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantidade:</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border border-gray-300 rounded-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={addToCart}
                  disabled={product.stock <= 0}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 text-gray-900 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Adicionar ao Carrinho</span>
                </button>
                <button
                  onClick={buyNow}
                  disabled={product.stock <= 0}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Comprar Agora
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-semibold mb-4">Características Principais</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Info for Physical Products */}
            {product.type === 'physical' && (
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h3 className="font-semibold mb-4 text-blue-900">Informações de Entrega</h3>
                <div className="space-y-3 text-sm text-blue-800">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4" />
                    <span>Frete grátis para todo o Brasil</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4" />
                    <span>Peso: {product.weight}kg | Dimensões: {product.dimensions}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="w-4 h-4" />
                    <span>Devolução gratuita em até 30 dias</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border">
          <h2 className="text-2xl font-bold mb-6">Descrição do Produto</h2>
          <p className="text-gray-700 leading-relaxed mb-8">{product.longDescription}</p>

          <h3 className="text-xl font-semibold mb-4">Especificações Técnicas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                <span className="font-medium text-gray-600">{key}:</span>
                <span className="text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}