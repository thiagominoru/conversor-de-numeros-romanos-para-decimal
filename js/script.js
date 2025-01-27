/*

Inputs e Botoes

*/
const inputRomano = document.querySelector("#input__romano");
const inputDecimal = document.querySelector("#input__decimal");
const button = document.querySelector("#button__input");
/* -- --  */

/*

Modal

*/
const modalError = document.querySelector("#modal__error");
const modalErrorPhrase = document.querySelector("#modal__error--phrase");
const modalCloseButton = document.querySelector("#button__modal--close");
/* -- -- */

const maxNumber = 10_000;

const numeroRomanos = {
	I: {
		value: 1,
		maximoRepeticao: 3,
		precede_I: true,
		precede_V: true,
		precede_X: true,
		precede_G: false,
		precede_C: false,
		precede_D: false,
		precede_M: false,
	},
	V: {
		value: 5,
		maximoRepeticao: 0,
		precede_I: true,
		precede_V: false,
		precede_X: false,
		precede_G: false,
		precede_C: false,
		precede_D: false,
		precede_M: false,
	},
	X: {
		value: 10,
		maximoRepeticao: 3,
		precede_I: true,
		precede_V: true,
		precede_X: true,
		precede_G: true,
		precede_C: true,
		precede_D: false,
		precede_M: false,
	},
	G: {
		value: 50,
		maximoRepeticao: 0,
		precede_I: true,
		precede_V: true,
		precede_X: true,
		precede_G: false,
		precede_C: false,
		precede_D: false,
		precede_M: false,
	},
	C: {
		value: 100,
		maximoRepeticao: 3,
		precede_I: true,
		precede_V: true,
		precede_X: true,
		precede_G: true,
		precede_C: true,
		precede_D: true,
		precede_M: true,
	},
	D: {
		value: 500,
		maximoRepeticao: 0,
		precede_I: false,
		precede_V: false,
		precede_X: true,
		precede_G: true,
		precede_C: true,
		precede_D: false,
		precede_M: false,
	},
	M: {
		value: 1000,
		maximoRepeticao: 10,
		precede_I: true,
		precede_V: true,
		precede_X: true,
		precede_G: true,
		precede_C: true,
		precede_D: true,
		precede_M: true,
	},
};

const numeroDecimais = {
	1: "I",
	4: "IV",
	5: "V",
	9: "IX",
	10: "X",
	40: "XG",
	50: "G",
	90: "XC",
	100: "C",
	400: "CD",
	500: "D",
	900: "CM",
	1000: "M",
};

/*

Romano para Decimal

*/
function conversorRomanoParaDecimal(valor) {
	valor = valor.toUpperCase().split("");

	let soma = 0;

	let antecessor = 0;

	if (validarNumeroRomano(valor) === false) {
		return false;
	}

	for (let i = 0; i < valor.length; i++) {
		soma = soma + numeroRomanos[valor[i]]["value"];

		if (i > 0) {
			antecessor = i - 1;
		}

		// console.log(numeroRomanos[valor[antecessor]][`precede_${valor[i]}`]);

		if (valor.length === 1) {
			soma = numeroRomanos[valor[antecessor]]["value"];
		} else {
			if (
				numeroRomanos[valor[i]]["value"] >
				numeroRomanos[valor[antecessor]]["value"]
			) {
				soma = soma - numeroRomanos[valor[antecessor]]["value"] * 2;
			}
		}
	}

	return soma;
}
/* -- --  */

/* 

Decimal Para Romano

*/

function conversorDecimalRomano(valor) {
	let isValid = isSimboloValido(valor, "decimal");

	if (isValid === false) {
		inputDecimal.classList.add("input__error");
	} else {
		valor = Number(valor);
		let resto = valor;
		let result = "";
		let i = 0;
		const decimaisCrescenteArray = Object.entries(numeroDecimais);

		if (valor > maxNumber) {
			return false;
		}

		for (i; i < decimaisCrescenteArray.length; i++) {
			if (Number(decimaisCrescenteArray[i][0]) > valor) {
				valor = valor - Number(decimaisCrescenteArray[i - 1][0]);
				result += decimaisCrescenteArray[i - 1][1];
				resto = valor;

				if (resto === 0) {
					break;
				}

				i = 0;
			} else if (i === decimaisCrescenteArray.length - 1) {
				valor = valor - Number(decimaisCrescenteArray[i][0]);
				result += decimaisCrescenteArray[i][1];
				resto = valor;
				if (resto === 0) {
					break;
				}
				i = 0;
			}
		}

		return result;
	}
}

function checarRepeticaoValida(valor) {
	let repeticoes = {};

	for (let i = 0; i < valor.length; i++) {
		const simbolo = valor[i];

		if (numeroRomanos[simbolo] === undefined) {
			return false;
		}

		if (numeroRomanos[simbolo]["maximoRepeticao"] > 0) {
			if (!repeticoes[simbolo]) {
				repeticoes[simbolo] = 1;
			} else {
				repeticoes[simbolo]++;
			}

			if (
				repeticoes[simbolo] > numeroRomanos[simbolo]["maximoRepeticao"]
			) {
				return false;
			}
		}
	}

	return true;
}

function checarOrdem1Valida(valor) {
	let primeiroI = false;

	for (let i = 0; i < valor.length - 1; i++) {
		if (valor[i] === "I" && valor[i + 1] === "I" && valor[i + 2] === "I") {
			if (valor[i + 3]) {
				return false;
			}
		}

		if (valor[i] === "I" && !primeiroI) {
			primeiroI = true;
		} else if (primeiroI && valor[i + 1] !== "I" && valor[i + 2] !== "I") {
			return false;
		}

		if (valor[i] === "I" && valor[i + 1] !== "I" && valor[i + 2] === "I") {
			return false;
		}

		const simboloAtual = valor[i];
		const simboloProximo = valor[i + 1];

		if (!numeroRomanos[simboloAtual][`precede_${simboloProximo}`]) {
			return false;
		}
	}

	return true;
}

function validarNumeroRomano(valor) {
	return checarRepeticaoValida(valor) && checarOrdem1Valida(valor);
}

button.addEventListener("click", (e) => {
	e.preventDefault();

	if (
		!conversorRomanoParaDecimal(inputRomano.value) &&
		inputRomano.value !== ""
	) {
		//
		modalErrorPhrase.textContent = `O simbolo "${inputRomano.value.toUpperCase()}" não é permitido para os números romanos`;
		modalError.showModal();
		//
	} else if (!conversorDecimalRomano(inputDecimal.value)) {
		modalErrorPhrase.textContent = `O simbolo "${inputDecimal.value.toUpperCase()}" não é permitido para os números decimias `;
		modalError.showModal();
	} else {
		//
		let contador = 0;
		let animacaoInterval = setInterval(() => {
			if (contador === 0) {
				inputDecimal.value = ".";
			} else if (contador === 1) {
				inputDecimal.value = ". .";
			} else if (contador === 2) {
				inputDecimal.value = ". . .";
			}
			contador = (contador + 1) % 4;

			if (contador === 0) {
				clearInterval(animacaoInterval);
				inputDecimal.value = conversorRomanoParaDecimal(
					inputRomano.value
				);
			}
		}, 250);
	}
});

inputDecimal.addEventListener("keyup", (e) => {
	let valor = inputDecimal.value;

	// 9 = Tab
	if (e.key === "Backspace" || e.keyCode === 9) {
		return true;
	}

	let resultado = conversorDecimalRomano(valor);

	if (!resultado) {
		inputDecimal.classList.add("input__error");
	} else {
		inputRomano.value = resultado;
		inputDecimal.classList.remove("input__error");
		inputRomano.classList.remove("input__error");
	}
});

inputRomano.addEventListener("keyup", (e) => {
	let valor = inputRomano.value.toUpperCase();
	let isValid = isSimboloValido(valor, "romano");

	if (isValid === false) {
		inputRomano.classList.add("input__error");
	} else {
		let resultado = conversorRomanoParaDecimal(valor);

		if (!resultado) {
			inputRomano.classList.add("input__error");
		} else {
			inputDecimal.value = resultado;
			inputRomano.classList.remove("input__error");
			inputDecimal.classList.remove("input__error");
		}
	}

	if (inputRomano.value.trim().length === 0) {
		inputRomano.classList.remove("input__error");
		inputDecimal.value = "";
	}
});

/*

Checa se letra existe no objeto Romano ou verifica se caracteres sao diferentes de numeros

*/
function isSimboloValido(valor, tipo) {
	if (tipo === "romano") {
		const letras = valor.split("");
		for (let i = 0; i < valor.length; i++) {
			if (letras[i] in numeroRomanos === false) {
				return false;
			}
		}
		return true;
	} else {
		let resultado = [];

		for (let i = 0; i < valor.length; i++) {
			let char = valor[i];

			let numeroConvertido = parseInt(char);

			if (!isNaN(numeroConvertido)) {
				resultado.push(numeroConvertido);
			} else {
				resultado.push(char);
			}
		}

		for (let i = 0; i < resultado.length; i++) {
			if (typeof resultado[i] !== "number") {
				return false;
			}
		}
		return true;
	}
}

/*

Fechar Modal de Errro

*/
modalCloseButton.addEventListener("click", (e) => {
	e.preventDefault();
	modalError.close();
});
