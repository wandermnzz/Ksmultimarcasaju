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
const cards = document.querySelectorAll(".card");

function aplicarFiltros() {
    const genero = filtroGenero.value;
    const numero = filtroNumero.value;

    cards.forEach(card => {
        const cardGenero = card.getAttribute("data-genero");
        const cardNumero = card.getAttribute("data-numero");

        let mostrar = true;

        if (genero !== "todos" && cardGenero !== genero) {
            mostrar = false;
        }

        if (numero !== "todos" && cardNumero !== numero) {
            mostrar = false;
        }

        card.style.display = mostrar ? "block" : "none";
    });
}

filtroGenero.addEventListener("change", aplicarFiltros);
filtroNumero.addEventListener("change", aplicarFiltros);

/* ===== CARRINHO AVANÇADO ===== */
/* ===== CARRINHO AVANÇADO ===== */
const cartSidebar = document.getElementById("cartSidebar");
const cartItems = document.getElementById("cartItems");
const closeCart = document.getElementById("closeCart");
const consultarBtn = document.getElementById("consultarBtn");
const cartIcon = document.querySelector(".cart-container");

let carrinho = [];

/* ABRIR / FECHAR CARRINHO */
cartIcon.addEventListener("click", () => {
    cartSidebar.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
});

/* ADICIONAR PRODUTO */
document.querySelectorAll(".btn-carrinho").forEach(btn => {
    btn.addEventListener("click", () => {

        const card = btn.closest(".card");
        const selectNumero = card.querySelector(".select-numero");
        const numero = selectNumero.value;

        if (numero === "") {
            alert("Por favor, escolha a numeração.");
            return;
        }

        const nome = btn.dataset.nome;
        const genero = btn.dataset.genero;

        carrinho.push({ nome, numero, genero });

        document.getElementById("cartCount").textContent = carrinho.length;
        atualizarCarrinho();
    });
});

/* ATUALIZAR CARRINHO */
function atualizarCarrinho() {
    cartItems.innerHTML = "";

    carrinho.forEach((item, index) => {
        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <strong>${item.nome}</strong><br>
            Número: ${item.numero}<br>
            ${item.genero}<br>
            <button class="remove-item" onclick="removerItem(${index})">
                Remover
            </button>
        `;

        cartItems.appendChild(div);
    });
}

/* REMOVER ITEM */
function removerItem(index) {
    carrinho.splice(index, 1);
    document.getElementById("cartCount").textContent = carrinho.length;
    atualizarCarrinho();
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

    const telefone = "557999295629"; // troque pelo número real
    window.open(`https://wa.me/${telefone}?text=${mensagem}`, "_blank");
});
