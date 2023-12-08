document.addEventListener("DOMContentLoaded", function() {
    var emCartazLink = document.getElementById("emCartaz");
    var emBreveLink = document.getElementById("emBreve");

    emCartazLink.addEventListener("click", function() {
        emCartazLink.classList.add("active");
        emBreveLink.classList.remove("active");
    });

    emBreveLink.addEventListener("click", function() {
        emBreveLink.classList.add("active");
        emCartazLink.classList.remove("active");
    });
});

// para gerar grade na pagina de assentos
const assentosContainer = document.getElementById('assentos-container');
const numeroDeAssentosPorLado = 14;
const numeroDeLinhas = 13;
const letrasFileira = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function criarAssentos() {
    for (let linha = 0; linha < numeroDeLinhas; linha++) {
        for (let assento = 1; assento <= numeroDeAssentosPorLado; assento++) {
            const assentoElement = document.createElement('div');
            assentoElement.classList.add('assento');
            
            // Adiciona a classe 'lateral' para os assentos laterais
            if (assento > numeroDeAssentosPorLado / 2) {
                assentoElement.classList.add('lateral');
            }

            const letraFileira = letrasFileira.charAt(linha);
            assentoElement.textContent = `${letraFileira}${assento}`;
            assentoElement.addEventListener('click', () => reservarAssento(assentoElement));
            assentosContainer.appendChild(assentoElement);
        }
    }
}

function reservarAssento(assentoElement) {
    assentoElement.classList.toggle('reservado');
}

criarAssentos();

//só vai prosseguir se escolher uma cadeira
function verificarAssentos() {
    // Obtém todos os elementos com a classe 'reservado'
    const assentosReservados = document.querySelectorAll('.assento.reservado');

    // Verifica se pelo menos 1 assento foi escolhido
    if (assentosReservados.length > 0) {
        // Se pelo menos 1 assento foi escolhido, atualiza a pagina
        window.location.href = 'tipoIngresso.html';
    } else {
        // Se nenhum assento for escolhido
        alert('Escolha pelo um assento para prosseguir.');
    }
}

//login
function validarLogin() {
    // Obter os valores dos campos de entrada
    const email = document.getElementById('inputEmail').value;
    const senha = document.getElementById('inputPassword').value;

    // Verificar se os campos estão preenchidos
    if (email.trim() === '' || senha.trim() === '') {
        alert('Preencha todos os campos.');
        return;
    }

    // Login padrão
    const emailPadrao = 'abc123@gmail.com';
    const senhaPadrao = 'Abc123';

    // Verificar se o email e a senha estão corretos
    if (email === emailPadrao && senha === senhaPadrao) {
        window.location.href = 'pagamento.html';
    } else {
        alert('Email ou senha incorretos!');
    }
}

//validação tipo de ingresso
function confirmarCompra() {
    const quantidadeInteira = parseInt(document.getElementById('quantidadeInteira').value, 10);
    const quantidadeMeia = parseInt(document.getElementById('quantidadeMeia').value, 10);
    const quantidadeClienteIntercine = parseInt(document.getElementById('quantidadeClienteIntercine').value, 10);

    if (quantidadeInteira > 0 || quantidadeMeia > 0 || quantidadeClienteIntercine > 0) {
        window.location.href = 'combo.html';
    } else {
        alert('Escolha um tipo de ingresso para continuar.');
    }
}

// Calculo valor total pagina ingresso
function calcularTotal() {
    const quantidadeInteira = parseInt(document.getElementById('quantidadeInteira').value, 10) || 0;
    const quantidadeMeia = parseInt(document.getElementById('quantidadeMeia').value, 10) || 0;
    const quantidadeClienteIntercine = parseInt(document.getElementById('quantidadeClienteIntercine').value, 10) || 0;

    const precoInteira = 30;
    const precoMeia = 15;
    const precoClienteIntercine = 20;

    // Calcular o valor total para cada tipo de ingresso
    const totalInteira = quantidadeInteira * precoInteira;
    const totalMeia = quantidadeMeia * precoMeia;
    const totalClienteIntercine = quantidadeClienteIntercine * precoClienteIntercine;

    // Exibir o valor de cada tipo de ingresso
    document.getElementById('valorInteira').textContent = `Valor: R$ ${totalInteira.toFixed(2)}`;
    document.getElementById('valorMeia').textContent = `Valor: R$ ${totalMeia.toFixed(2)}`;
    document.getElementById('valorClienteIntercine').textContent = `Valor: R$ ${totalClienteIntercine.toFixed(2)}`;

    const valorTotal = totalInteira + totalMeia + totalClienteIntercine;
    document.getElementById('valorTotal').value = `R$ ${valorTotal.toFixed(2)}`;
}

document.getElementById('prosseguirBtn').addEventListener('click', confirmarCompra);

//pagina combo
// Função para calcular o valor total dos combos de pipoca
function calcularTotalPipoca() {
    // Obter os valores dos combos de pipoca
    const valorCombo1 = 40;
    const valorCombo2 = 60;

    // Obter as quantidades dos combos de pipoca
    const quantidadeCombo1 = parseInt(document.getElementById('quantidadeCombo1').value) || 0;
    const quantidadeCombo2 = parseInt(document.getElementById('quantidadeCombo2').value) || 0;

    // Calcular o valor total dos combos de pipoca
    const totalPipoca = (valorCombo1 * quantidadeCombo1) + (valorCombo2 * quantidadeCombo2);

    // Atualizar o valor total dos combos de pipoca na tela
    document.getElementById('valorTotalPipoca').innerText = `Valor Total: R$ ${totalPipoca.toFixed(2)}`;
    
}

function prosseguirPagamento() { 
    window.location.href = "login.html";
}

//tela pagamento
function processarPagamento() {
    var metodoPagamento = document.getElementById("metodoPagamento").value;

    var camposValidos = true;

    if (metodoPagamento === "debito" || metodoPagamento === "credito") {
        camposValidos = validarCartaoCredito();
    }

    if (camposValidos) {
        window.location.href = "confirmacao.html";
    } else {
        alert("Por favor, corrija os erros nos campos antes de prosseguir.");
    }
}

function validarCartaoCredito() {
    var numeroCartao = document.getElementById("numeroCartao").value;
    var cvv = document.getElementById("cvv").value;
    var dataExpiracaoInput = document.getElementById("dataExpiracao");
    var dataExpiracao = dataExpiracaoInput.value.replace(/\D/g, ''); // Remove não dígitos (máscara)

    // Validação do número do cartão (16 dígitos)
    if (!/^\d{16}$/.test(numeroCartao)) {
        alert("Número do cartão inválido. Deve conter 16 dígitos.");
        return false;
    }

    // Validação do CVV (3 dígitos)
    if (!/^\d{3}$/.test(cvv)) {
        alert("CVV inválido. Deve conter 3 dígitos.");
        return false;
    }

    // Validação da data de expiração (formato mm/aaaa)
    var regexDataExpiracao = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regexDataExpiracao.test(dataExpiracaoInput.value)) {
        alert("Data de expiração inválida. Deve seguir o formato mm/aaaa.");
        return false;
    }

    return true;
}

//aparece quando clica em debito ou crédito
function alternarCamposPagamento() {
    var metodoPagamento = document.getElementById("metodoPagamento").value;
    var camposPix = document.getElementById("camposPix");
    var camposCartao = document.getElementById("camposCartao");

    if (metodoPagamento === "pix") {
        camposPix.style.display = "block";
        camposCartao.style.display = "none";
    } else {
        camposPix.style.display = "none";
        camposCartao.style.display = "block";
    }

    $('#dataExpiracao').inputmask('99/9999', { placeholder: 'mm/aaaa' });
}


 







