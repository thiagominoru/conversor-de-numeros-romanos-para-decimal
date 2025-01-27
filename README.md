# ✨ Conversor de números romanos para decimal

O sistema numérico representado pelos algarismos romanos originou-se na Roma antiga e permaneceu como a maneira usual de escrever números em toda a Europa até o final da Idade Média. Os algarismos romanos, conforme usados hoje, empregam sete símbolos, cada um com um valor inteiro fixo. Veja na tabela abaixo os pares Símbolo = Valor:
&nbsp;

| Romano | Decimal |
| ------ | :-----: |
| I      |    1    |
| V      |    5    |
| X      |   10    |
| G      |   50    |
| C      |   100   |
| D      |   500   |
| M      |  1000   |

&nbsp;

## ✒ _Demandas Essenciais_:

1. O usuário deve ter um campo para inserir o símbolo romano e um botão para acionar a conversão;
2. O usuário deve ver o resultado da conversão para decimal (base 10) em um único campo de saída;
3. Se um símbolo errado for inserido, o usuário deverá ver um erro;</br>

&nbsp;

## ⭐ _Bônus_

1. O usuário pode ver a conversão a ser feita automaƟcamente enquanto digita;
2. O usuário pode fazer a conversão de decimal para romano (vice-versa);

&nbsp;

## 💻 _Tecnologias utilizadas_

-   Javascript
-   CSS
-   HTML

&nbsp;

## ⚠ _Observação_

Valores acima de 3999 foi utilizado a repetição do simbolo 'M' ( máximo 10 ). </br>
Caso deseje aumentar ou retornar para a quantidade máxima permitida ( 3 repetições), basta mudar as seguintes variaveis

```
const maxNumber = valor de preferência
```

```
	M: {
		value: 1000,
		maximoRepeticao: X, <- Valor desejável
		precede_I: true,
		precede_V: true,
		precede_X: true,
		precede_G: true,
		precede_C: true,
		precede_D: true,
		precede_M: true,
	},
```

## 👀 _Preview_
![image alt](https://github.com/thiagominoru/conversor-de-numeros-romanos-para-decimal/blob/main/Preview.png?raw=true)
