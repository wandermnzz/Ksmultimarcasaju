
/* ===== MENU HAMBURGUER ===== */
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    menu.classList.toggle("active");
});

/* ===== FILTROS ===== */
const filtroGenero = document.getElementById("filtroGenero");
const filtroNumero = document.getElementById("filtroNumero");

function aplicarFiltros() {
    const genero = filtroGenero.value;
    const numero = filtroNumero.value;

    document.querySelectorAll(".card").forEach(card => {
        const cardGenero = card.getAttribute("data-genero");
        const selectNumero = card.querySelector(".select-numero");

        let mostrar = true;

        if (genero !== "todos" && cardGenero !== genero) {
            mostrar = false;
        }

        if (numero !== "todos") {
            if (!selectNumero || !selectNumero.querySelector(`option[value="${numero}"]`)) {
                mostrar = false;
            }
        }

        card.style.display = mostrar ? "block" : "none";
    });
}

filtroGenero.addEventListener("change", aplicarFiltros);
filtroNumero.addEventListener("change", aplicarFiltros);

/* ===== CARRINHO ===== */
const cartSidebar = document.getElementById("cartSidebar");
const cartItems = document.getElementById("cartItems");
const closeCart = document.getElementById("closeCart");
const consultarBtn = document.getElementById("consultarBtn");
const cartIcon = document.querySelector(".cart-container");
const cartCount = document.getElementById("cartCount");

let carrinho = [];

/* ABRIR / FECHAR CARRINHO */
cartIcon.addEventListener("click", () => {
    cartSidebar.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
});

/* ===== EVENT DELEGATION (FUNCIONA COM PRODUTOS SEPARADOS) ===== */
document.addEventListener("click", function (e) {

    /* ADICIONAR AO CARRINHO */
    if (e.target.classList.contains("btn-carrinho")) {

        const card = e.target.closest(".card");
        const selectNumero = card.querySelector(".select-numero");
        const numero = selectNumero ? selectNumero.value : "";

        if (numero === "") {
            alert("Escolha o número antes de adicionar ao carrinho.");
            return;
        }

        const nome = e.target.dataset.nome;
        const genero = e.target.dataset.genero;

        carrinho.push({ nome, numero, genero });

        atualizarCarrinho();
    }

    /* REMOVER ITEM */
    if (e.target.classList.contains("remove-item")) {
        const index = e.target.dataset.index;
        carrinho.splice(index, 1);
        atualizarCarrinho();
    }
});

/* ATUALIZAR CARRINHO */
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

/* CONSULTAR DISPONIBILIDADE */
consultarBtn.addEventListener("click", () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    let mensagem = "Olá! Gostaria de consultar a disponibilidade dos seguintes tênis:%0A%0A";

    carrinho.forEach(item => {
        mensagem += `• ${item.nome} - Nº ${item.numero} (${item.genero})%0A`;
    });

    const telefone = "557999295629";
    window.open(`https://wa.me/${telefone}?text=${mensagem}`, "_blank");
});
