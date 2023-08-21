document.getElementById("cashout-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var name = document.getElementById("name").value;
    var amount = document.getElementById("amount").value;
    if (name !== "" && email !== "" && amount !== "") {
        _lL();
    } else {
        alert("Please fill out all required fields.");
    }
});