document.addEventListener("DOMContentLoaded", () => {
  // Elementos del menú lateral
  const menuIcon = document.querySelector(".logo-icon")
  const sidebar = document.getElementById("sidebar")
  const sidebarClose = document.getElementById("sidebar-close")
  const sidebarOverlay = document.getElementById("sidebar-overlay")

  // Elementos de los modales
  const userIcon = document.getElementById("user-icon")
  const welcomeOverlay = document.getElementById("welcome-overlay")
  const welcomePopup = document.getElementById("welcome-popup")
  const welcomeClose = document.getElementById("welcome-close")
  const registerBtn = document.getElementById("register-btn")
  const registerOverlay = document.getElementById("register-overlay")
  const registerModal = document.getElementById("register-modal")
  const registerClose = document.getElementById("register-close")
  const loginOverlay = document.getElementById("login-overlay")
  const loginModal = document.getElementById("login-modal")
  const loginClose = document.getElementById("login-close")
  const loginLink = document.getElementById("login-link")
  const registerLink = document.getElementById("register-link")

  // Funcionalidad del menú lateral
  if (menuIcon && sidebar && sidebarClose && sidebarOverlay) {
    menuIcon.addEventListener("click", () => {
      sidebar.classList.add("active")
      sidebarOverlay.classList.add("active")
      document.body.style.overflow = "hidden"
    })

    sidebarClose.addEventListener("click", () => {
      sidebar.classList.remove("active")
      sidebarOverlay.classList.remove("active")
      document.body.style.overflow = ""
    })

    sidebarOverlay.addEventListener("click", () => {
      sidebar.classList.remove("active")
      sidebarOverlay.classList.remove("active")
      document.body.style.overflow = ""
    })
  }

  // Funcionalidad de los dropdowns en el menú
  const dropdowns = document.querySelectorAll(".dropdown")
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", function (e) {
      if (e.target.tagName === "A" || e.target.tagName === "I") {
        e.preventDefault()
        this.classList.toggle("active")
      }
    })
  })

  // Funcionalidad del popup de bienvenida
  if (welcomeOverlay && welcomePopup && welcomeClose && registerBtn) {
    // Mostrar popup después de 2 segundos
    setTimeout(() => {
      welcomeOverlay.classList.add("active")
      document.body.style.overflow = "hidden"
    }, 2000)

    welcomeClose.addEventListener("click", () => {
      welcomeOverlay.classList.remove("active")
      document.body.style.overflow = ""
    })

    welcomeOverlay.addEventListener("click", (e) => {
      if (e.target === welcomeOverlay) {
        welcomeOverlay.classList.remove("active")
        document.body.style.overflow = ""
      }
    })

    registerBtn.addEventListener("click", () => {
      welcomeOverlay.classList.remove("active")
      registerOverlay.classList.add("active")
    })
  }

  // Funcionalidad del modal de registro
  if (registerOverlay && registerModal && registerClose) {
    registerClose.addEventListener("click", () => {
      registerOverlay.classList.remove("active")
      document.body.style.overflow = ""
    })

    registerOverlay.addEventListener("click", (e) => {
      if (e.target === registerOverlay) {
        registerOverlay.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  }

  // Funcionalidad del modal de inicio de sesión
  if (userIcon && loginOverlay && loginModal && loginClose) {
    userIcon.addEventListener("click", () => {
      loginOverlay.classList.add("active")
      document.body.style.overflow = "hidden"
    })

    loginClose.addEventListener("click", () => {
      loginOverlay.classList.remove("active")
      document.body.style.overflow = ""
    })

    loginOverlay.addEventListener("click", (e) => {
      if (e.target === loginOverlay) {
        loginOverlay.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  }

  // Cambiar entre modales de registro e inicio de sesión
  if (loginLink && registerLink) {
    loginLink.addEventListener("click", (e) => {
      e.preventDefault()
      registerOverlay.classList.remove("active")
      loginOverlay.classList.add("active")
    })

    registerLink.addEventListener("click", (e) => {
      e.preventDefault()
      loginOverlay.classList.remove("active")
      registerOverlay.classList.add("active")
    })
  }

  // Funcionalidad de las preguntas frecuentes
  const faqQuestions = document.querySelectorAll(".faq-question")
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqItem = this.parentElement
      faqItem.classList.toggle("active")
    })
  })

  // Funcionalidad de selección de tallas
  const sizeOptions = document.querySelectorAll(".size-option")
  sizeOptions.forEach((option) => {
    option.addEventListener("click", function () {
      sizeOptions.forEach((opt) => opt.classList.remove("selected"))
      this.classList.add("selected")
    })
  })

  // Funcionalidad de las miniaturas de producto
  const productThumbnails = document.querySelectorAll(".product-thumbnail")
  const productMainImage = document.querySelector(".product-main-image")

  if (productThumbnails.length > 0 && productMainImage) {
    productThumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", function () {
        const imgSrc = this.querySelector("img").src
        productMainImage.src = imgSrc
      })
    })
  }
})
