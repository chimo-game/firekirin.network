function myFunction() {
    x = document.getElementsByClassName("my-link");  // Find the elements
    for (var i = 0; i < x.length; i++) {
        x[i].innerText = "Deposit Now";    // Change the content
    }

}

myFunction();