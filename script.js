// ======================================
// Currency Converter (with Flags & Symbols)
// File: script.js
// ======================================


// ======================================
// STEP 1: FLAGS
// ======================================
var flags = {
    USD: "🇺🇸",
    PKR: "🇵🇰",
    EUR: "🇪🇺",
    INR: "🇮🇳",
    GBP: "🇬🇧",
    JPY: "🇯🇵",
    CAD: "🇨🇦",
    AUD: "🇦🇺",
    AED: "🇦🇪",
    SAR: "🇸🇦",
    CNY: "🇨🇳",
    CHF: "🇨🇭",
    TRY: "🇹🇷",
    KRW: "🇰🇷",
    SGD: "🇸🇬",
    MYR: "🇲🇾",
    THB: "🇹🇭",
    NZD: "🇳🇿"
};


// ======================================
// STEP 2: CURRENCY SYMBOLS
// ======================================
var symbols = {
    USD: "$",
    PKR: "₨",
    EUR: "€",
    INR: "₹",
    GBP: "£",
    JPY: "¥",
    CAD: "C$",
    AUD: "A$",
    AED: "د.إ",
    SAR: "﷼",
    CNY: "¥",
    CHF: "CHF",
    TRY: "₺",
    KRW: "₩",
    SGD: "S$",
    MYR: "RM",
    THB: "฿",
    NZD: "NZ$"
};


// ======================================
// STEP 3: CONVERT CURRENCY
// ======================================
function convertCurrency() {

    var amount = document.getElementById("amount").value;
    var from = document.getElementById("fromCurrency").value;
    var to = document.getElementById("toCurrency").value;

    // Update Flags
    document.getElementById("fromFlag").innerHTML = flags[from];
    document.getElementById("toFlag").innerHTML = flags[to];

    // Validation
    if (amount === "" || amount <= 0) {

        document.getElementById("result").innerHTML =
            "⚠️ Please enter a valid amount.";

        return;
    }

    // API URL
    var url = "https://api.exchangerate-api.com/v4/latest/" + from;

    fetch(url)

    .then(function(response) {
        return response.json();
    })

    .then(function(data) {

        var rate = data.rates[to];

        var converted = amount * rate;

        document.getElementById("result").innerHTML =
            "💰 <b>" +
            symbols[from] + parseFloat(amount).toFixed(2) +
            "</b> (" + from + ") " + flags[from] +

            "<br><br>" +

            "⬇️" +

            "<br><br>" +

            "<b>" +
            symbols[to] + converted.toFixed(2) +
            "</b> (" + to + ") " + flags[to];

    })

    .catch(function(error) {

        document.getElementById("result").innerHTML =
            "❌ Unable to fetch exchange rates.";

        console.log(error);

    });

}



// ======================================
// STEP 4: SWAP CURRENCIES
// ======================================
function swapCurrency() {

    var from = document.getElementById("fromCurrency");
    var to = document.getElementById("toCurrency");

    var temp = from.value;
    from.value = to.value;
    to.value = temp;

    convertCurrency();
}



// ======================================
// STEP 5: AUTO UPDATE
// ======================================
document.getElementById("amount").addEventListener("input", convertCurrency);

document.getElementById("fromCurrency").addEventListener("change", convertCurrency);

document.getElementById("toCurrency").addEventListener("change", convertCurrency);
