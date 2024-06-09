const texto = document.querySelector('input')
const btnInsert = document.querySelector('.divInsert button')
const btnDeleteAll = document.querySelector('.deletar')
const btnResetar = document.querySelector('.resetar')
const ul = document.querySelector('ul')

const listaPrincipal = ["Absorvente",
"Açúcar",
"Amendoim",
"Arroz Branco",
"Arroz Integral",
"Aveia",
"Amaciante",
"Álcool",
"Alho",
"Absorvente diário",
"Absorvente noturno",
"Azeite de Olivia",
"Azeite de dendê",
"Bucha de prato",
"Bucha de aço",
"Café",
"Catchup",
"Calabresa",
"Carne de sertão",
"Creme dental",
"Corante",
"Cotonete",
"Condicionador",
"Condensado",
"Chocolate",
"Desifetante",
"Desodotante",
"Detergente",
"Extrato",
"Farinha de trigo",
"Feijão",
"Fermento",
"Fosforo",
"Flocos de milho",
"Leite em pó",
"Leite em pó (desnatado)",
"Leite líquido",
"Leite líquido (desnatado)",
"Leite líquido (zerolactose)",
"Macarrão",
"Macarrão (integral)",
"Maisena",
"Maionese",
"Margarina",
"Margarina (zerolactose)",
"Milho de pipoca",
"Multiuso",
"Óleo de soja",
"Papel toalha",
"Papel higiênico",
"Pedra perfumada",
"Peroba",
"Shampo",
"Sabão em pó",
"Sabão de cocô",
"Sabão em pasta",
"Sabonete",
"Sabonete líquido (Protex)",
"Sal",
"Sardinha",
"Queijo ralado"
];
var itensDB = []

btnDeleteAll.onclick = () => {
  itensDB = []
  updateDB()
}

function resetador(){
  for(i = 0; i < listaPrincipal.length; i++){
    itensDB.push({ 'item': listaPrincipal[i], 'status': '' })
  }  
  updateDB()
}

btnResetar.onclick = resetador;

/*btnResetar.onclick = () => {
  for(i = 0; i < listaPrincipal.length; i++){
    itensDB.push({ 'item': listaPrincipal[i], 'status': '' })
  }  
  updateDB()
}*/

texto.addEventListener('keypress', e => {
  if (e.key == 'Enter' && texto.value != '') {
    setItemDB()
  }
})

btnInsert.onclick = () => {
  if (texto.value != '') {
    setItemDB()
  }
}

function setItemDB() {
  if (itensDB.length >= 40) {
    alert('Limite máximo de 40 itens atingido!')
    return
  }

  itensDB.push({ 'item': texto.value, 'status': '' })
  updateDB()
}

function updateDB() {
  localStorage.setItem('todolist', JSON.stringify(itensDB))
  loadItens()
}

function loadItens() {
  ul.innerHTML = "";
  itensDB = JSON.parse(localStorage.getItem('todolist')) ?? []
  itensDB.forEach((item, i) => {
    insertItemTela(item.item, item.status, i)
  })
}

function insertItemTela(text, status, i) {
  const li = document.createElement('li')
  
  li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${text}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
    </div>
    `
  ul.appendChild(li)

  if (status) {
    document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
  } else {
    document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')
  }

  texto.value = ''
}

function done(chk, i) {

  if (chk.checked) {
    itensDB[i].status = 'checked' 
  } else {
    itensDB[i].status = '' 
  }

  updateDB()
}

function removeItem(i) {
  itensDB.splice(i, 1)
  updateDB()
}

loadItens()