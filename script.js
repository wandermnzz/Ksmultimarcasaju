
document.addEventListener("DOMContentLoaded", () => {

    /* ===== MENU ===== */
    const menuToggle = document.getElementById("menuToggle");
    const menu = document.getElementById("menu");

    if (menuToggle && menu) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            menu.classList.toggle("active");
        });
    }

    /* ===== FILTRO GÊNERO ===== */
    const filtroGenero = document.getElementById("filtroGenero");

    function aplicarFiltros() {
        const genero = filtroGenero.value;

        document.querySelectorAll(".card").forEach(card => {
            const cardGenero = card.dataset.genero;
            card.style.display =
                genero === "todos" || cardGenero === genero
                    ? "block"
                    : "none";
        });
    }

    if (filtroGenero) {
        filtroGenero.addEventListener("change", aplicarFiltros);
    }

    /* ===== CARRINHO ===== */
    const cartSidebar = document.getElementById("cartSidebar");
    const cartItems = document.getElementById("cartItems");
    const closeCart = document.getElementById("closeCart");
    const consultarBtn = document.getElementById("consultarBtn");
    const cartIcon = document.querySelector(".cart-container");
    const cartCount = document.getElementById("cartCount");

    let carrinho = [];

    if (cartIcon && cartSidebar) {
        cartIcon.addEventListener("click", () => {
            cartSidebar.classList.add("active");
        });
    }

    if (closeCart) {
        closeCart.addEventListener("click", () => {
            cartSidebar.classList.remove("active");
        });
    }

    /* ===== EVENT DELEGATION ===== */
    document.addEventListener("click", (e) => {

        if (e.target.classList.contains("btn-carrinho")) {
            const card = e.target.closest(".card");
            const selectNumero = card.querySelector(".select-numero");
            const numero = selectNumero.value;

            if (!numero) {
                alert("Escolha o número.");
                return;
            }

            carrinho.push({
                nome: e.target.dataset.nome,
                genero: e.target.dataset.genero,
                numero
            });

            atualizarCarrinho();
        }

        if (e.target.classList.contains("remove-item")) {
            const index = e.target.dataset.index;
            carrinho.splice(index, 1);
            atualizarCarrinho();
        }
    });

    function atualizarCarrinho() {
        cartItems.innerHTML = "";

        carrinho.forEach((item, index) => {
            cartItems.innerHTML += `
                <div class="cart-item">
                    <strong>${item.nome}</strong><br>
                    Nº ${item.numero} • ${item.genero}<br>
                    <button class="remove-item" data-index="${index}">
                        Remover
                    </button>
                </div>
            `;
        });

        cartCount.textContent = carrinho.length;
    }

    if (consultarBtn) {
        consultarBtn.addEventListener("click", () => {
            if (!carrinho.length) {
                alert("Carrinho vazio");
                return;
            }

            let msg = "Olá! Gostaria de consultar:%0A%0A";
            carrinho.forEach(i => {
                msg += `• ${i.nome} - Nº ${i.numero} (${i.genero})%0A`;
            });

            window.open(
                `https://wa.me/557999295629?text=${msg}`,
                "_blank"
            );
        });
    }
});
