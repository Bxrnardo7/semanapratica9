// Base de dados: objeto com um array de oito produtos.
const data = {
  produtos: [
    { id: 1, nome: "Smartphone Nova 128 GB", preco: 1499.90, categoria: "Celulares", imagem: "imagens/celular.svg", descricao: "Smartphone com tela de 6,5 polegadas, 128 GB de armazenamento e bateria de 5.000 mAh. Ideal para as tarefas do dia a dia.", emEstoque: true },
    { id: 2, nome: "Smartphone Pro 256 GB", preco: 2399.90, categoria: "Celulares", imagem: "imagens/celular.svg", descricao: "Smartphone com 256 GB de armazenamento, 8 GB de RAM e câmera de 50 MP para registrar seus melhores momentos.", emEstoque: false },
    { id: 3, nome: "Notebook Essencial 15", preco: 2899.90, categoria: "Notebooks", imagem: "imagens/notebook.svg", descricao: "Notebook com tela de 15,6 polegadas, 8 GB de RAM e SSD de 256 GB. Uma opção para estudar e trabalhar.", emEstoque: true },
    { id: 4, nome: "Notebook Performance", preco: 4599.90, categoria: "Notebooks", imagem: "imagens/notebook.svg", descricao: "Notebook com 16 GB de RAM, SSD de 512 GB e tela Full HD. Indicado para programação e uso de vários aplicativos.", emEstoque: true },
    { id: 5, nome: "Headset Studio", preco: 249.90, categoria: "Acessórios", imagem: "imagens/headset.svg", descricao: "Headset com microfone integrado, conexão por cabo e almofadas confortáveis para reuniões, músicas e jogos.", emEstoque: true },
    { id: 6, nome: "Headset Wireless", preco: 399.90, categoria: "Acessórios", imagem: "imagens/headset.svg", descricao: "Headset sem fio com microfone ajustável, conexão Bluetooth e bateria com autonomia de até 20 horas.", emEstoque: false },
    { id: 7, nome: "Controle Gamepad", preco: 199.90, categoria: "Games", imagem: "imagens/controle.svg", descricao: "Controle com conexão USB, dois analógicos e design ergonômico. Compatível com jogos de computador que aceitam gamepad.", emEstoque: true },
    { id: 8, nome: "Controle Gamepad Pro", preco: 349.90, categoria: "Games", imagem: "imagens/controle.svg", descricao: "Controle sem fio com bateria recarregável, vibração e botões adicionais para personalizar sua experiência nos jogos.", emEstoque: true }
  ]
};

// Seleção de elementos utilizando os métodos solicitados.
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const renderButton = document.querySelector("#btnRender");
const productCount = document.getElementById("product-count");

function formatPrice(preco) {
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function createProductCard(produto) {
  const card = document.createElement("article");
  card.classList.add("card");
  card.setAttribute("data-id", produto.id);
  card.style.borderRadius = "16px"; // Ajuste visual diretamente pelo DOM.

  const image = document.createElement("img");
  image.setAttribute("src", produto.imagem);
  image.setAttribute("alt", "Ilustração de " + produto.nome);
  image.setAttribute("width", "320");
  image.setAttribute("height", "200");
  card.appendChild(image);

  const body = document.createElement("div");
  body.classList.add("card-body");

  const category = document.createElement("p");
  category.classList.add("category-label");
  category.textContent = produto.categoria;
  body.appendChild(category);

  const title = document.createElement("h3");
  title.classList.add("card-title");
  title.textContent = produto.nome;
  body.appendChild(title);

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatPrice(produto.preco);
  body.appendChild(price);

  const stock = document.createElement("p");
  stock.classList.add("stock");
  stock.textContent = produto.emEstoque ? "Em estoque" : "Indisponível";
  if (!produto.emEstoque) stock.classList.add("unavailable");
  body.appendChild(stock);

  const actions = document.createElement("div");
  actions.classList.add("card-actions");

  const detailsButton = document.createElement("button");
  detailsButton.setAttribute("type", "button");
  detailsButton.textContent = "Ver detalhes";
  detailsButton.addEventListener("click", function () {
    showProductDetails(produto);
  });
  actions.appendChild(detailsButton);

  const highlightButton = document.createElement("button");
  highlightButton.setAttribute("type", "button");
  highlightButton.setAttribute("aria-pressed", "false");
  highlightButton.classList.add("secondary");
  highlightButton.textContent = "Destacar";
  highlightButton.addEventListener("click", function () {
    if (card.classList.contains("highlight")) {
      card.classList.remove("highlight");
      highlightButton.textContent = "Destacar";
      highlightButton.setAttribute("aria-pressed", "false");
    } else {
      card.classList.add("highlight");
      highlightButton.textContent = "Remover destaque";
      highlightButton.setAttribute("aria-pressed", "true");
    }
  });
  actions.appendChild(highlightButton);
  body.appendChild(actions);
  card.appendChild(body);
  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";
  produtos.forEach(function (produto) {
    productList.appendChild(createProductCard(produto));
  });

  productCount.textContent = produtos.length === 1
    ? "1 produto encontrado"
    : produtos.length + " produtos encontrados";

  if (produtos.length === 0) {
    const message = document.createElement("p");
    message.classList.add("empty-state");
    message.textContent = "Nenhum produto encontrado. Tente outro nome ou categoria.";
    productList.appendChild(message);
  }

  // querySelectorAll é executado depois de criar os cards.
  console.group("Catálogo renderizado: " + produtos.length + " produto(s)");
  document.querySelectorAll(".card").forEach(function (card) {
    console.log("Card renderizado — data-id:", card.getAttribute("data-id"));
  });
  console.groupEnd();
}

function renderCategories() {
  categorySelect.innerHTML = "";
  const allOption = document.createElement("option");
  allOption.value = "";
  allOption.textContent = "Todas";
  categorySelect.appendChild(allOption);

  const categories = [...new Set(data.produtos.map(function (produto) {
    return produto.categoria;
  }))];

  categories.forEach(function (categoria) {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    categorySelect.appendChild(option);
  });
}

function showProductDetails(produto) {
  // Os valores abaixo vêm exclusivamente da base local definida neste arquivo.
  productDetails.innerHTML = `
    <p class="eyebrow">DETALHES DO PRODUTO</p>
    <h2>${produto.nome}</h2>
    <p class="price">${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Status de estoque:</strong> ${produto.emEstoque ? "Em estoque" : "Indisponível"}</p>
    <p>${produto.descricao}</p>
  `;
}

// A normalização permite buscar "acessorios" e "acessórios" da mesma forma.
function normalizeText(texto) {
  return texto.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function filterProducts() {
  const searchText = normalizeText(searchInput.value);
  const selectedCategory = categorySelect.value;
  return data.produtos.filter(function (produto) {
    const matchesName = normalizeText(produto.nome).includes(searchText);
    const matchesCategory = selectedCategory === "" || produto.categoria === selectedCategory;
    return matchesName && matchesCategory;
  });
}

function updateCatalog() {
  renderProducts(filterProducts());
}

searchInput.addEventListener("input", updateCatalog);
categorySelect.addEventListener("change", updateCatalog);
// Renderizar recarrega a listagem respeitando os filtros atuais.
renderButton.addEventListener("click", updateCatalog);

renderCategories();
renderProducts(data.produtos);
