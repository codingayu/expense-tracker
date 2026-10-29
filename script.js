let total = 0;
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
     
function displayExpense(expense) {
          let list = document.getElementById("expenseList");

    let item = document.createElement("li");

    let button = document.createElement("button");

    item.textContent =
        "₹" + expense.amount +
        " | " + expense.category +
        " | " + expense.date + " ";

    button.textContent = "DELETE";
    button.style.backgroundColor = "red";
    button.addEventListener("click", function () {

    item.remove();

    total -= Number(expense.amount);
    document.getElementById("total").textContent = total;

    expenses = expenses.filter(function(exp) {
        return !(
            exp.amount == expense.amount &&
            exp.category == expense.category &&
            exp.date == expense.date
        );
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));

});

    item.appendChild(button);

    list.appendChild(item);


}

function addExpense()
{
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;
    let date = document.getElementById("date").value;

    if (amount == "") {
        alert("Please enter an amount.");
        return;
    }

    if (date == "") {
        alert("Please enter a date.");
        return;
    }

    let expense = {
        amount: amount,
        category: category,
        date: date
    };

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

   displayExpense(expense);

    total += Number(amount);
    document.getElementById("total").textContent = total;

    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
    document.getElementById("category").selectedIndex = 0;
}

document.getElementById("amount").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("category").focus();
    }
});

document.getElementById("category").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("date").focus();
    }
});

document.getElementById("date").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addExpense();
    }
});
expenses.forEach(function(expense) {

    displayExpense(expense);

    total += Number(expense.amount);

});

document.getElementById("total").textContent = total;