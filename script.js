/* DATABASE MENU JUALAN */
const allMenu = [
    { id: 1, cat: 'dimsum', name: 'Dimsum Ayam Mix', price: 15000, img: 'img/dimsun ayam mix.jpg', unit: '4 pcs', badge: 'Terlaris' },
    { id: 2, cat: 'dimsum', name: 'Dimsum Udang Premium', price: 20000, img: 'img/udang premium.jpg', unit: '4 pcs', badge: 'Premium' },
    { id: 3, cat: 'dimsum', name: 'Dimsum Kepiting', price: 18000, img: 'img/dimsum kepiting.jpg', unit: '4 pcs', badge: '' },
    { id: 4, cat: 'dimsum', name: 'Dimsum Jamur', price: 15000, img: 'img/dimsum jamur.jpg', unit: '4 pcs', badge: '' },
    { id: 5, cat: 'dimsum', name: 'Dimsum Mozzarella', price: 22000, img: 'img/dimsum mozarella.jpg', unit: '4 pcs', badge: 'Cheese' },
    { id: 6, cat: 'dimsum', name: 'Ceker Pedas Mercon', price: 12000, img: 'img/ceker pedas mercon.jpg', unit: 'Porsi', badge: 'Pedas 🔥' },
    { id: 7, cat: 'dimsum', name: 'Dimsum Nori', price: 17000, img: 'img/dimsum nori.jpg', unit: '4 pcs', badge: '' },
    { id: 8, cat: 'dimsum', name: 'Dimsum Mentai Flare', price: 23000, img: 'img/dimsum mentai.jpg', unit: '4 pcs', badge: 'Favorit' },
    { id: 9, cat: 'dimsum', name: 'Pangsit Goreng Mayo', price: 15000, img: 'img/pangsit goreng mayo.jpg', unit: '5 pcs', badge: 'Crispy' },
    { id: 10, cat: 'dimsum', name: 'Dimsum Smoked Beef', price: 18000, img: 'img/Dimsum Smoked Beef.jpg', unit: '4 pcs', badge: '' },
    { id: 11, cat: 'minuman', name: 'Thai Tea Signature', price: 8000, img: 'img/Thai Tea Signature.jpg', unit: 'Cup', badge: '' },
    { id: 12, cat: 'minuman', name: 'Es Cincau Brown Sugar', price: 10000, img: 'img/Es Cincau Brown Sugar.jpg', unit: 'Cup', badge: '' },
    { id: 13, cat: 'minuman', name: 'Matcha Creamy Latte', price: 12000, img: 'img/Matcha Creamy Latte.jpg', unit: 'Cup', badge: 'New' },
    { id: 14, cat: 'minuman', name: 'Es Campur Pelangi', price: 15000, img: 'img/Es Campur Pelangi.jpg', unit: 'Mangkuk', badge: '' },
    { id: 15, cat: 'minuman', name: 'Frozen Lemonade', price: 7000, img: 'img/Frozen Lemonade.jpg', unit: 'Cup', badge: 'Segar' },
    { id: 16, cat: 'minuman', name: 'Coffee Aren Velvet', price: 13000, img: 'img/Coffee Aren Velvet.jpg', unit: 'Cup', badge: 'rekomended' },
];

let currentFilter = 'all';
let cart = [];

/* FUNGSI MENAMPILKAN MENU */
function renderMenu() {
    const grid = document.getElementById('menu-grid');
    const search = document.getElementById('searchInput').value.toLowerCase();
    grid.innerHTML = ''; 
    
    const filtered = allMenu.filter(item => {
        const matchCat = currentFilter === 'all' || item.cat === currentFilter;
        const matchSearch = item.name.toLowerCase().includes(search);
        return matchCat && matchSearch;
    });

    filtered.forEach(item => {
        grid.innerHTML += `
            <div class="menu-card group bg-white rounded-[32px] overflow-hidden border border-gray-50 relative h-full flex flex-col">
                ${item.badge ? `<span class="absolute top-4 left-4 z-10 bg-white/90 px-3 py-1 rounded-xl text-[10px] font-black uppercase text-pink-600">${item.badge}</span>` : ''}
                <div class="h-56 overflow-hidden"><img src="${item.img}" class="img-zoom w-full h-full object-cover" onerror="this.src='https://via.placeholder.com/300x200?text=Dimsum+Sultan'"></div>
                <div class="p-6 flex flex-col flex-grow">
                    <h3 class="font-extrabold text-gray-800 text-lg mb-1 leading-tight">${item.name}</h3>
                    <p class="text-gray-400 text-xs mb-4 italic">Pilihan bahan premium terbaik</p>
                    <div class="mt-auto flex justify-between items-center">
                        <div>
                            <p class="text-pink-500 font-black text-xl">Rp ${item.price.toLocaleString('id-ID')}</p>
                            <p class="text-gray-300 text-[10px] uppercase font-bold tracking-widest">per ${item.unit}</p>
                        </div>
                        <button onclick="addToCart('${item.name}', ${item.price})" class="bg-gray-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-pink-500 transition-colors shadow-lg">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>`;
    });
}

/* FUNGSI PINDAH KATEGORI */
function filterBy(cat, event) {
    currentFilter = cat;
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('bg-pink-500', 'text-white');
        btn.classList.add('bg-white', 'text-gray-500');
    });
    event.currentTarget.classList.remove('bg-white', 'text-gray-500');
    event.currentTarget.classList.add('bg-pink-500', 'text-white');
    renderMenu();
}

/* FUNGSI KERANJANG */
function toggleCart() { 
    document.getElementById('cart-sidebar').classList.toggle('translate-x-full'); 
}

function addToCart(name, price) {
    const index = cart.findIndex(i => i.name === name);
    if (index > -1) {
        cart[index].qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPrice = document.getElementById('total-price');
    let total = 0, count = 0;
    
    cartItems.innerHTML = '';
    cart.forEach((item, i) => {
        total += item.price * item.qty;
        count += item.qty;
        cartItems.innerHTML += `
            <div class="flex justify-between items-center bg-gray-50 p-5 rounded-[24px]">
                <div>
                    <p class="font-extrabold text-gray-800">${item.name}</p>
                    <p class="text-pink-500 font-bold text-sm">${item.qty}x • Rp ${(item.price * item.qty).toLocaleString('id-ID')}</p>
                </div>
                <button onclick="removeItem(${i})" class="text-red-400 hover:text-red-600 p-2"><i class="fas fa-trash-alt"></i></button>
            </div>`;
    });
    cartCount.innerText = count;
    totalPrice.innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

function removeItem(index) { 
    cart.splice(index, 1); 
    updateCartUI(); 
}

/* FUNGSI CHECKOUT WHATSAPP (VERSI BARU) */
function checkoutWhatsApp() {
    if (cart.length === 0) return alert("Keranjang belanja kosong!");

    const now = new Date();
    const waktu = `${now.getDate()}/${now.getMonth()+1} ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

    let text = "```\n";
    text += "      DIMSUM SULTAN\n";
    text += `TGL: ${waktu}\n`;
    text += "--------------------------\n";

    let totalBayar = 0;
    cart.forEach(item => {
        const subtotal = item.price * item.qty;
        totalBayar += subtotal;
        
        text += `${item.name.toUpperCase()}\n`;
        text += `${item.qty} x ${item.price.toLocaleString('id-ID')} = ${subtotal.toLocaleString('id-ID')}\n`;
    });

    text += "--------------------------\n";
    text += `TOTAL: Rp ${totalBayar.toLocaleString('id-ID')}\n`;
    text += "--------------------------\n";
    text += "   TERIMA KASIH SULTAN\n";
    text += "```";

    window.open(`https://wa.me/6285877239265?text=${encodeURIComponent(text)}`);
}

// Jalankan saat halaman dibuka
renderMenu();