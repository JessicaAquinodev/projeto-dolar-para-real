let dolar = 0

async function getValorDolar(){
    return await fetch('https://economia.awesomeapi.com.br/last/USD-BRL').then(response => response.json());
}


getValorDolar().then(valor => {
    dolar = valor.USDBRL.high;
});

let usdInput = document.querySelector("#usd")
let brlInput = document.querySelector("#brl")

usdInput.addEventListener("keyup", () => {
    convert("usd-to-brl")
})

brlInput.addEventListener("keyup", () => {
    convert("brl-to-usd")
})

usdInput.addEventListener("blur", () => {
    usdInput.value = formatarCurrency(usdInput.value)
})

brlInput.addEventListener("blur", () => {
    brlInput.value = formatarCurrency(brlInput.value)
})


usdInput.value = "1000,00"
convert("usd-to-brl")


// Funções

function formatarCurrency(value){
    let fixedValue = fixValue(value)
    let options = {
        useGrouping: false,
        minimumFractionDigits: 2
    }
    let formatter = new Intl.NumberFormat("pt-BR", options)
    return formatter.format(fixedValue)
}

function fixValue(value){
    let fixedValue = value.replace(",",".")
    let floatValue = parseFloat(fixedValue)
    if(floatValue == NaN) {
        floatValue = 0
    }
    return floatValue
}


function convert(type) {
    if(type == "usd-to-brl"){
        let fixedValue =fixValue(usdInput.value)
        let result = fixedValue * dolar
        result = result.toFixed(2)
        brlInput.value = formatarCurrency(result)
    }

    if(type == "brl-to-usd"){
        let fixedValue = fixValue(brlInput.value)

        let result = fixedValue / dolar
        result = result.toFixed(2)

        usdInput.value = formatarCurrency(result)
    }
}