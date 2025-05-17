// Funcionalidad de favoritos

// Clase para gestionar favoritos
class Favorites {
  constructor() {
    this.items = []

    // Cargar favoritos desde localStorage si existe
    this.loadFavorites()
  }

  // Añadir producto a favoritos
  addItem(product) {
    // Comprobar si el producto ya está en favoritos
    const existingItem = this.items.find((item) => item.id === product.id)

    if (!existingItem) {
      this.items.push(product)
      this.updateFavorites()
    }

    return this.items
  }

  // Eliminar producto de favoritos
  removeItem(productId) {
    this.items = this.items.filter((item) => item.id !== productId)
    this.updateFavorites()
    return this.items
  }

  // Comprobar si un producto está en favoritos
  isInFavorites(productId) {
    return this.items.some((item) => item.id === productId)
  }

  // Actualizar favoritos en localStorage
  updateFavorites() {
    localStorage.setItem(
      "footFavorites",
      JSON.stringify({
        items: this.items,
      }),
    )
  }

  // Cargar favoritos desde localStorage
  loadFavorites() {
    const savedFavorites = localStorage.getItem("footFavorites")

    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites)
      this.items = parsedFavorites.items || []
    }
  }
}

// Inicializar favoritos cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  // Crear instancia global de favoritos
  window.favorites = new Favorites()

  // Añadir funcionalidad a los botones de favoritos
  const favButtons = document.querySelectorAll(".fav-btn")
  favButtons.forEach((btn) => {
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

      const icon = this.querySelector("i")

      // Alternar estado de favorito
      if (icon.classList.contains("far")) {
        icon.classList.remove("far")
        icon.classList.add("fas")
        window.favorites.addItem(product)
      } else {
        icon.classList.remove("fas")
        icon.classList.add("far")
        window.favorites.removeItem(product.id)
      }
    })
  })

  // Actualizar iconos de favoritos según el estado guardado
  setTimeout(() => {
    const productCards = document.querySelectorAll(".product-card")
    productCards.forEach((card) => {
      const productName = card.querySelector(".product-name").textContent
      const productId = productName.toLowerCase().replace(/\s+/g, "-")
      const favButton = card.querySelector(".fav-btn")

      if (favButton && window.favorites.isInFavorites(productId)) {
        const icon = favButton.querySelector("i")
        icon.classList.remove("far")
        icon.classList.add("fas")
      }
    })
  }, 100)
})
