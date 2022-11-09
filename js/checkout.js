cart = JSON.parse(localStorage.getItem('carrito')) || [];
precioTotal = localStorage.getItem('precioTotal');
precioTotal = parseInt(precioTotal);
emailInput = localStorage.getItem('emailInput');
nombreInput = localStorage.getItem('nombreInput');
apellidoInput = localStorage.getItem('apellidoInput');

function renderDatosPersona() {
  let htmlPersona = `<li class="list-group-item"><strong>Nombres:</strong>  ${nombreInput}</li>
                          <li class="list-group-item"><strong>Apellido:</strong> ${apellidoInput}</li>
                          <li class="list-group-item"><strong>Email:</strong> ${emailInput}</li>`;
  document.getElementById('datosPersona').innerHTML = htmlPersona;
}
renderDatosPersona();

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
      </tr>
    `;
  }
  document.getElementById('div-cart').innerHTML = html;
}
renderCart();

/* Boton Gracias 😁 */
let btnFin = document.getElementById('btnGracias');
btnFin.addEventListener('click', finalizar);

function finalizar() {
  localStorage.clear();
  window.location.href = '../index.html';
}
