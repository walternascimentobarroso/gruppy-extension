document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("#genarate")
    .addEventListener("click", () => generateByType());
});

function generateByType() {
  const type = document.querySelector('input[name="type"]:checked').value;
  const number = document.querySelector("#number");
  const mask = document.querySelector("#mask").checked;
  if (type === "cpf") {
    number.value = mask ? formatCPF(generateCPF()) : generateCPF();
  } else {
    number.value = mask ? formatarCNPJ(generateCNPJ()) : generateCNPJ();
  }
}

function generateRandomNumber(length) {
  return Math.floor(Math.random() * 10 ** length)
    .toString()
    .padStart(length, "0");
}

function generateCPF() {
  const cpfBase = generateRandomNumber(9);
  const digit1 = calculateDigit(cpfBase);
  const digit2 = calculateDigit(cpfBase + digit1);
  return cpfBase + digit1 + digit2;
}

// Calcula os dois dígitos verificadores do CPF
function calculateDigit(base, startWeight) {
  let sum = 0;
  let weight = startWeight || base.length + 1;

  for (let i = 0; i < base.length; i++) {
    sum += parseInt(base[i]) * weight;
    weight--;
  }

  const mod = sum % 11;
  return mod < 2 ? 0 : 11 - mod;
}

// Calcula os dois dígitos verificadores do CNPJ
function validateDigit(base, startWeight) {
  let sum = 0;
  let weight = startWeight || base.length + 1;

  for (let i = base.length - 1; i >= 0; i--) {
    sum += parseInt(base[i]) * weight;
    if (weight === 9) weight = 2;
    else weight++;
  }

  const mod = sum % 11;
  return mod < 2 ? 0 : 11 - mod;
}

function generateCNPJ() {
  let CNPJ = generateRandomNumber(12);
  const firstDigit = validateDigit(CNPJ, 2);
  const secondDigit = validateDigit(CNPJ + firstDigit, 2);
  CNPJ += `${firstDigit}${secondDigit}`;
  return CNPJ;
}

function formatCPF(CPF) {
  const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
  return CPF.replace(regex, "$1.$2.$3-$4");
}

function formatarCNPJ(CNPJ) {
  const regex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/;
  return CNPJ.replace(regex, "$1.$2.$3/$4-$5");
}
