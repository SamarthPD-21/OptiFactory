let selectedBakery = "";
let bakeryBalances = JSON.parse(localStorage.getItem("bakeryBalances")) || { "Bakery X": 0, "Bakery Y": 0, "Bakery Z": 0 };

function selectBakery() {
    selectedBakery = document.getElementById("bakery-select").value;

    if (selectedBakery) {
        document.getElementById("selected-bakery").innerText = selectedBakery;
        document.getElementById("previous-balance").innerText = bakeryBalances[selectedBakery].toFixed(2);
        
        let paymentSection = document.getElementById("payment-section");
        paymentSection.classList.add("show");
    } else {
        document.getElementById("payment-section").classList.remove("show");
    }
}

function calculateTotal() {
    if (!selectedBakery) {
        alert("Please select a bakery first!");
        return;
    }

    let billAmount = parseFloat(document.getElementById("bill-amount").value);
    if (isNaN(billAmount) || billAmount <= 0) {
        alert("Please enter a valid bill amount.");
        return;
    }

    let totalDue = billAmount + bakeryBalances[selectedBakery];
    document.getElementById("total-due").innerText = totalDue.toFixed(2);
}

function updateBalance() {
    if (!selectedBakery) {
        alert("Please select a bakery first!");
        return;
    }

    let billAmount = parseFloat(document.getElementById("bill-amount").value);
    let amountPaid = parseFloat(document.getElementById("amount-paid").value);

    if (isNaN(billAmount) || billAmount <= 0) {
        alert("Please enter a valid bill amount.");
        return;
    }
    if (isNaN(amountPaid) || amountPaid < 0) {
        alert("Please enter a valid amount paid.");
        return;
    }

    let totalDue = billAmount + bakeryBalances[selectedBakery];
    let newBalance = totalDue - amountPaid;
    newBalance = newBalance < 0 ? 0 : newBalance; 

    bakeryBalances[selectedBakery] = newBalance;
    localStorage.setItem("bakeryBalances", JSON.stringify(bakeryBalances));

    document.getElementById("updated-balance").innerText = newBalance.toFixed(2);
    document.getElementById("previous-balance").innerText = newBalance.toFixed(2);
    document.getElementById("total-due").innerText = "0.00";

    document.getElementById("bill-amount").value = "";
    document.getElementById("amount-paid").value = "";
}
