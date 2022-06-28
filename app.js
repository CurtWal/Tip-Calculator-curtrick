'use strict'
console.log('Working')

// get the form class id
let form = document.getElementById('input-info');

// get the element id's inside the form
let bill = document.getElementById('bill'); //grab the bill id element from the html doc
let tipAmount = document.getElementById('tip-amount'); // grab the tips-amount id element from the html doc
let numOfCustomer = document.getElementById('number-customer'); // grab the number-customer id element from the html doc
let tipPerPerson = document.getElementById('total-per-person'); // get the total-per-person id element from the html doc
let total_bill = document.getElementById('split-bill'); //get the split-bill id element from the html doc
let restart = document.getElementById('reset'); // grab the reset button id from html doc

// constructer function for the tip-cal form
function Info(bill, tipAmount, numOfCustomer){
    this.bill = bill;
    this.tipAmount = tipAmount;
    this.numOfCustomer = numOfCustomer;
}

// add event listener to submit button
form.addEventListener('submit',function(e){
    // form doesn't reset html after sumbitting
    e.preventDefault();

        // Only allow numbers to be input 
    let totalbillAmount = parseFloat(bill.value);
    
    
    // the value tip amount
    let tip = parseInt(tipAmount.value);
console.log(tip)
   
// the amount of customers
    let customer = parseInt(numOfCustomer.value);
console.log(customer)

    // making a new object constructer function
    let infoData = new Info(totalbillAmount, tip, customer);

    localStorage.setItem('infoData', JSON.stringify(infoData)); // store items in local storage
	

    getValues(infoData.bill, infoData.tipAmount, infoData.numOfCustomer);
});

// write a function that calculates the total of the bill and and splits it between the number of customers
function getValues(bill,tip,customers){

    // need percentage of each bill
    let tipPercent = (tip / 100) * bill;
    
    // splitting the bill
    let billSplit = tipPercent / customers;

    // split the bill between the number of customers and at the tip to it
    let total = bill / customers + billSplit;

    // round total to the second decimal and not a whole number
    total = total.toFixed(2);
    console.log(total);

    results(billSplit.toFixed(2),total)
}

// show the results of the tip amount and the cost of the total bill split between all the customers
function results(tip,total){
    tipPerPerson.innerHTML = tip;
    console.log(tip);
    total_bill.innerHTML = total;
}

// make a way to reset page without reloading page
function cleanReset(){
    // resets the tip and bill total back to $0
    tipPerPerson.innerHTML = "$0.00";
    total_bill.innerHTML = "$0.00";
    // resets the input part of the form
    form.reset();
}

// Make a way to call the function above when clicking reset button
restart.addEventListener('click',function(){
    cleanReset();
})