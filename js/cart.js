// Funcionalidad del carrito de compras

// Clase para el carrito de compras
class ShoppingCart {
  constructor() {
    this.items = []
    this.total = 0
    this.count = 0

    // Cargar carrito desde localStorage si existe
    this.loadCart()
  }

  // Añadir producto al carrito
  addItem(product) {
    // Comprobar si el producto ya está en el carrito
    const existingItem = this.items.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.items.push({
        ...product,
        quantity: 1,
      })
    }

    this.updateCart()
    return this.items
  }

  // Eliminar producto del carrito
  removeItem(productId) {
    this.items = this.items.filter((item) => item.id !== productId)
    this.updateCart()
    return this.items
  }

  // Actualizar cantidad de un producto
  updateQuantity(productId, quantity) {
    const item = this.items.find((item) => item.id === productId)

    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) {
        this.removeItem(productId)
      } else {
        this.updateCart()
      }
    }

    return this.items
  }

  // Vaciar carrito
  clearCart() {
    this.items = []
    this.updateCart()
    return this.items
  }

  // Actualizar totales y guardar en localStorage
  updateCart() {
    this.count = this.items.reduce((total, item) => total + item.quantity, 0)
    this.total = this.items.reduce((total, item) => total + item.price * item.quantity, 0)

    // Actualizar contador en la interfaz
    const cartCountElement = document.querySelector(".cart-count")
    if (cartCountElement) {
      cartCountElement.textContent = this.count
    }

    // Guardar en localStorage
    localStorage.setItem(
      "footCart",
      JSON.stringify({
        items: this.items,
        total: this.total,
        count: this.count,
      }),
    )
  }

  // Cargar carrito desde localStorage
  loadCart() {
    const savedCart = localStorage.getItem("footCart")

    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      this.items = parsedCart.items || []
      this.total = parsedCart.total || 0
      this.count = parsedCart.count || 0

      // Actualizar contador en la interfaz
      const cartCountElement = document.querySelector(".cart-count")
      if (cartCountElement) {
        cartCountElement.textContent = this.count
      }
    }
  }
}

// Inicializar carrito cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  // Crear instancia global del carrito
  window.cart = new ShoppingCart()

  // Añadir funcionalidad a los botones de carrito
  const cartButtons = document.querySelectorAll(".cart-btn")
  cartButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const productCard = this.closest(".product-card")
      const productName = productCard.querySelector(".product-name").textContent
      const productPrice = Number.parseFloat(productCard.querySelector(".product-price").textContent.replace("€", ""))
      const productImg = productCard.querySelector("img").src

      // Crear objeto de producto
      const product = {
        id: productName.toLowerCase().replace(/\s+/g, "-"),
        name: productName,
        price: productPrice,
        image: productImg,
      }

      // Añadir al carrito
      window.cart.addItem(product)

      // Mostrar mensaje
      alert(`¡${productName} añadido al carrito!`)
    })
  })
})
