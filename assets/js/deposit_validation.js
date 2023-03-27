document.getElementById("deposit-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("inputEmail4").value;
    var amount = document.getElementById("amount").value;
    var cash_tag = document.getElementById("cash-tag").value;
    if (name !== "" && email !== "" && amount !== "" & cash_tag !== "") {
        CPABuildLock();
    } else {
        alert("Please fill out all required fields.");
    }
});