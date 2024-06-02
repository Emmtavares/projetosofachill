document.addEventListener('DOMContentLoaded', function() {

        let currentIndex = 0;
        const items = document.querySelectorAll('.carousel-item');
        const totalItems = items.length;
    
        function showNextItem() {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % totalItems;
            items[currentIndex].classList.add('active');
        }
    
        const interval = setInterval(showNextItem, 5000);
    
        document.querySelector('.carousel-control.next').addEventListener('click', function() {
            clearInterval(interval);
            showNextItem();
        });
    
        document.querySelector('.carousel-control.prev').addEventListener('click', function() {
            clearInterval(interval);
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            items[currentIndex].classList.add('active');
        });

            document.querySelectorAll('.adicionar-ao-carrinho').forEach(button => {
                button.addEventListener('click', function() {
                    const produto = {
                        id: this.dataset.productId,
                        nome: this.dataset.productName,
                        preco: this.dataset.productPrice,
                        imagem: this.dataset.productImage
                    };
                    adicionarAoCarrinho(produto);
                    alert('Produto adicionado ao carrinho');
                });
            });
        
            function adicionarAoCarrinho(produto) {
                let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
                carrinho.push(produto);
                localStorage.setItem('carrinho', JSON.stringify(carrinho));
            }
        
            if (document.querySelector('.lista-carrinho')) {
                carregarItensCarrinho();
            }
        
            function carregarItensCarrinho() {
                const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
                const listaCarrinho = document.querySelector('.lista-carrinho');
                listaCarrinho.innerHTML = '';
        
                carrinho.forEach(produto => {
                    const item = document.createElement('div');
                    item.classList.add('item-carrinho');
                    item.innerHTML = `
                        <img src="${produto.imagem}" alt="${produto.nome}" class="item-carrinho-imagem">
                        <div class="item-carrinho-detalhes">
                            <h3>${produto.nome}</h3>
                            <p>${produto.preco}</p>
                        </div>
                    `;
                    listaCarrinho.appendChild(item);
                });
            }
        });
    
            
                document.querySelectorAll('.adicionar-aos-favoritos').forEach(button => {
                    button.addEventListener('click', function() {
                        const produto = {
                            id: this.dataset.productId,
                            nome: this.dataset.productName,
                            preco: this.dataset.productPrice,
                            imagem: this.dataset.productImage
                        };
                        adicionarAosFavoritos(produto);
                        alert('Produto adicionado aos favoritos');
                    });
                });
            
                function adicionarAosFavoritos(produto) {
                    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
                    if (!favoritos.some(item => item.id === produto.id)) {
                        favoritos.push(produto);
                        localStorage.setItem('favoritos', JSON.stringify(favoritos));
                    } else {
                        alert('Produto já está nos favoritos');
                    }
                }
            
                if (document.querySelector('.lista-favoritos')) {
                    carregarItensFavoritos();
                }
            
                function carregarItensFavoritos() {
                    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
                    const listaFavoritos = document.querySelector('.lista-favoritos');
                    listaFavoritos.innerHTML = '';
            
                    favoritos.forEach(produto => {
                        const item = document.createElement('div');
                        item.classList.add('item-favoritos');
                        item.innerHTML = `
                            <img src="${produto.imagem}" alt="${produto.nome}" class="item-favoritos-imagem">
                            <div class="item-favoritos-detalhes">
                                <h3>${produto.nome}</h3>
                                <p>${produto.preco}</p>
                            </div>
                        `;
                        listaFavoritos.appendChild(item);
                    });
                }
            
            ;
        
    
        const checkoutForm = document.getElementById('checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', function(event) {
                event.preventDefault();
                alert('Purchase completed!');
            });
        }
    
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                if (username && password) {
                    localStorage.setItem('username', username);
                    window.location.href = 'profile.html';
                } else {
                    alert('Please enter both username and password.');
                }
            });
        }
    
        const profileUsername = document.getElementById('profile-username');
        if (profileUsername) {
            const username = localStorage.getItem('username');
            if (username) {
                profileUsername.textContent = username;
            } else {
                window.location.href = 'login.html';
            }
        }
    
        const loggedIn = localStorage.getItem('loggedIn');
        if (loggedIn) {
            document.getElementById('login-link').style.display = 'none';
            document.getElementById('profile-link').style.display = 'block';
            document.getElementById('logout-link').style.display = 'block';
        } else {
            document.getElementById('login-link').style.display = 'block';
            document.getElementById('profile-link').style.display = 'none';
            document.getElementById('logout-link').style.display = 'none';
        }
    
        document.getElementById('logout-link').addEventListener('click', function() {
            localStorage.clear();
            window.location.href = 'index.html';
        });
    
        document.querySelector('.search-form').addEventListener('submit', function(event) {
            event.preventDefault();
            const query = document.querySelector('.search-form input[name="query"]').value;
            window.location.href = `search.html?query=${query}`;
        });
    
        if (document.querySelector('.cart-list')) {
            loadCartItems();
        }
    
        function loadCartItems() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const cartList = document.querySelector('.cart-list');
            cartList.innerHTML = '';
    
            cart.forEach(product => {
                const item = document.createElement('div');
                item.classList.add('cart-item');
                item.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${product.name}</h3>
                        <p>${product.price}</p>
                    </div>
                `;
                cartList.appendChild(item);
            });
        }
    
        if (document.querySelector('.favorites-list')) {
            loadFavoritesItems();
        }
    
        function loadFavoritesItems() {
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            const favoritesList = document.querySelector('.favorites-list');
            favoritesList.innerHTML = '';
    
            favorites.forEach(product => {
                const item = document.createElement('div');
                item.classList.add('favorites-item');
                item.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="favorites-item-image">
                    <div class="favorites-item-details">
                        <h3>${product.name}</h3>
                        <p>${product.price}</p>
                    </div>
                `;
                favoritesList.appendChild(item);
            });
        }