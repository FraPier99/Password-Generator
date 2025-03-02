

const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
const container = 
document.querySelector('.container')

const root = document.documentElement
console.log(root)
// SVG (Light Mode)
const sunSVG = `
  <svg id="sunIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2"/>
  </svg>
`;

// SVG  st (Dark Mode)
const moonSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16">
  <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
</svg>
`;

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  enableDarkMode();
}

// Evento per cambiare tema
darkModeToggle.addEventListener('click', () => {
  if (document.body.classList.contains('dark-mode')) {
    enableLightMode();
  } else {
    enableDarkMode();
  }
});

// 🔹 Funzione per attivare la Dark Mode
function enableDarkMode() {
  document.body.classList.add('dark-mode');
  localStorage.setItem('theme', 'dark');
  darkModeIcon.innerHTML = sunSVG; // Cambia icona

  // Cambia variabili CSS per colori generali
  root.style.setProperty('--bg-light', '#222831'); // Colore del body
  root.style.setProperty('--text-light', '#ffffff'); // Colore testo
  root.style.setProperty('--bg-light-container', '#2B3035'); // Colore container in dark mode
}


function enableLightMode() {
  document.body.classList.remove('dark-mode');
  localStorage.setItem('theme', 'light');
  darkModeIcon.innerHTML = moonSVG; // Cambia icona

  // Ripristina variabili CSS per il tema chiaro
  root.style.setProperty('--bg-light', '#f8ecec'); // Colore del body chiaro
  root.style.setProperty('--text-light', '#000000'); // Colore testo chiaro
  root.style.setProperty('--bg-light-container', '#ffffff'); // Colore container in light mode
}



// Tutti i possibili valori per la password

const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

// Selezione Elementi HTML
const lunghezza = document.querySelector('.length');
const button = document.getElementById('submit');
const password = document.getElementById('pass');
const copyBtn = document.getElementById('copyBtn');
const rangeInput = document.getElementById('customRange2');
const rangeValue = document.getElementById('rangeValue');
const password_copiata = document.querySelector('.password_copiata')









// Aggiorna il valore del range quando cambia
rangeInput.addEventListener('input', () => {
  rangeValue.textContent = rangeInput.value;// Aggiorna il testo   length scelta
creaPass()
});

// Funzione per ottenere un numero casuale usando un metodo sicuro (crypto API)
function getRandomSecure(max) {
  const array = new Uint32Array(1);// Array a 32 bit per ottenere un numero casuale
  window.crypto.getRandomValues(array);// Riempie l'array con numeri casuali crittograficamente sicuri
  return array[0] % max; // Restituisce un numero compreso tra 0 e max -1 


}

// Aggiungi caratteri  casuali da un set specifico
function addItem(str) {
  let res = [];
  for (let i = 0; i < 2; i++) { // x2
    let char = getRandomSecure(str.length); // indice casuale
    res.push(str[char]);
  }
  return res.join('');
  // 1,2-A-B etc
}

// Crea la password
const creaPass = (length = lunghezza.value) => {
  password.innerText = '';
  const sets = [lowercase, uppercase, numbers, specialChars]; // Array con tutti i set di caratteri
  const pass = [];

  // Aggiungi almeno un carattere da ogni set
  sets.forEach(set => pass.push(addItem(set)));// es [a,A,1,?]

  // Riempi la password fino alla lunghezza richiesta
  while (pass.length < length) { // pass.length = 4 ,length= 8
    let randomSet = sets[getRandomSecure(sets.length)];
    pass.push(randomSet[getRandomSecure(randomSet.length)]);
  }

  // Mescola i caratteri
  let result = randomize(pass).join('');
  password.innerText = result;
   password.style.display = 'block'
};

// Funzione per mescolare i caratteri con Fisher-Yates Shuffle
function randomize(values) {
  let index = values.length, randomIndex;

  while (index != 0) {
    randomIndex = getRandomSecure(index);
    index--;

    // Scambia
    [values[index], values[randomIndex]] = [values[randomIndex], values[index]];
  }

  return values;
}

// Gestisci il pulsante di generazione
button.addEventListener('click', function () {
  creaPass();
  if (password.textContent.trim()) {
    copyBtn.disabled = false;
  } else {
    copyBtn.disabled = true;
  }
  password.style.display = 'block';
});

// Abilita/disabilita il pulsante di copia
password.addEventListener('input', updateButtonState);

function updateButtonState() {
  if (password.textContent.trim()) {
    copyBtn.disabled = false;
  } else {
    copyBtn.disabled = true;
  }
}

// Funzione per copiare la password negli appunti
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(password.textContent)

    .then(()=> 

  
    copyBtn.innerText = 'Password Copiata !',

  setTimeout(()=>{

    copyBtn.innerText = 'Copia Password'

  },1000)


)

      // alert('Password copiata negli appunti!'))
    .catch(err => console.error('Errore nella copia:', err));
});

copyBtn.addEventListener('dblclick', () => {
  navigator.clipboard.readText()

    .then((text)=> 

  
  console.log(text),

  setTimeout(()=>{

    copyBtn.innerText = 'Copia Password'

  },1000)


)

      // alert('Password copiata negli appunti!'))
    .catch(err => console.error('Errore nella copia:', err));
});





