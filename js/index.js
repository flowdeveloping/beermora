let cart = JSON.parse(localStorage.getItem('carrito')) || [];
let precioTotal = localStorage.getItem('precioTotal');
precioTotal = parseInt(precioTotal);
let emailInput = localStorage.getItem('emailInput');
let nombreInput = localStorage.getItem('nombreInput');
let apellidoInput = localStorage.getItem('apellidoInput');

//😎 Renderizacion de Productos 🍻
function renderProductos() {
  fetch('../json/bebidas.json')
    .then((res) => res.json())
    .then((bebidas) => {
      let html = '';
      for (let i = 0; i < bebidas.length; i++) {
        html =
          html +
          `
<div>
    <div class="col">
    <div class="card">
      <img src="../${bebidas[i].img}" class="card-img-top " alt="...">
      <div class="card-body">
        <h5 class="card-title text-center">${bebidas[i].nombre}</h5>
        <h5 class="card-text text-center">${bebidas[i].categoria} </h5>
        <h5 class="card-text text-center mb-3">$ ${bebidas[i].precio}</h5>
        <div class="col text-center">
          <button onclick="addToCart(${bebidas[i].id});" type="button" class="btn btn-warning btn-lg">Comprar</button>
       </div>
      </div>
    </div>
  </div>
</div>
    `;
      }
      document.getElementById('div-productos').innerHTML = html;
    })
    .catch((e) => {
      console.log(e);
    });
}

//😎 Renderizacion de Carrito con productos 🍻
function renderCart() {
  let html = '';
  for (let i = 0; i < cart.length; i++) {
    html =
      html +
      `
<tr>
      <th scope="row"><img src="../${cart[i].img}" class="card-img-top img-table w-25" alt="imagen"></th>
      <td>${cart[i].nombre}: ${cart[i].categoria}</td>
      <td>$${cart[i].precio}</td>
      <td><i class="fa-solid fa-cart-shopping" onclick="removeFromCart(${i}); saveLocal();" ></i></td>
    </tr>
  `;
  }
  document.getElementById('div-cart').innerHTML = html;
}

// set item (setear)
const saveLocal = () => {
  localStorage.setItem('carrito', JSON.stringify(cart));
  localStorage.setItem('precioTotal', precioTotal);
  localStorage.setItem('emailInput', emailInput);
  localStorage.setItem('nombreInput', nombreInput);
  localStorage.setItem('apellidoInput', apellidoInput);
};

function addToCart(id) {
  fetch('../json/bebidas.json')
    .then((res) => res.json())
    .then((bebidas) => {
      const foundBebida = bebidas.find((item) => item.id == id);
      cart.push(foundBebida);
      renderCart();
      saveLocal();
      calcPrecioTotal();
    })
    .catch((e) => {
      console.log(e);
    });
}

//❎ Removiendo productos del carrito, Funcion
function removeFromCart(id) {
  cart.splice(id, 1);
  renderCart();
  saveLocal();
  calcPrecioTotal();
}

function calcPrecioTotal() {
  precioTotal = cart.reduce((acc, bebida) => {
    return (acc += bebida.precio);
  }, 0);
  document.getElementById('total').innerHTML = 'total: $' + precioTotal;
  saveLocal();
  console.log(precioTotal);
}

renderProductos();
renderCart();
calcPrecioTotal();

/* Finalizar Compra */
let btnFinCompra = document.getElementById('finCompra');
btnFinCompra.addEventListener('click', finCompra);
function finCompra() {
  /* validando que fecha y cantidad de entradas de la peli estén seleccionadas*/
  if (!cart.length > 0) {
    Swal.fire({
      icon: 'error',
      title: 'Cuidado...',
      text: 'no puedes finalizar compra si el carrito está vacío',
    });
  } else {
    /* obtiene valores de los input */
    emailInput = document.getElementById('email').value;
    nombreInput = document.getElementById('nombre').value;
    apellidoInput = document.getElementById('apellido').value;
    if (emailInput == '' || nombreInput == '' || apellidoInput == '') {
      document.getElementById('error').innerHTML = `<div class="alert alert-warning" role="alert">Por favor complete todos los datos</div>`;
    } else {
      saveLocal();
      window.location.href = '../pag/finCompra.html';
    }
  }
}
