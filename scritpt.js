
const plusValue = document.querySelector("#money-plus");
const minusValue = document.querySelector("#money-minus");
const balance = document.querySelector('#balance');
const ulDomElement = document.querySelector('#transactions');

const form = document.querySelector('#form');
const inpuTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');


const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'));
let transactions = localStorage
    .getItem('transactions') !== null? 
     localStorageTransactions: [];

// Remove as transacoes
const RemoveTransaction = ID => {
    transactions = transactions
    .filter(transaction => transaction.id !== ID);
    updateLocalStorage();
    init();
}

// Adiciona transacoes no DOM
const addTransactionIntoDOM = ({amount, name, id}) =>{
    const operator = amount < 0 ? '-':'+'; 
    const CSSClass = amount < 0? 'minus':'plus';
    const amountWithoutOperator = Math.abs(amount);
    const li = document.createElement('li');
    
    li.classList.add(CSSClass);
    li.innerHTML = `${name} 
    
    <span>${operator} R$ ${amountWithoutOperator} 
    </span>
    
    <button class="delete-btn" onClick="RemoveTransaction(${id})">
    x
    </button>
    `
    console.log(li);
   ulDomElement.append(li);
}

const getExpenses = (transactionsAmout) => {
    Math.abs(transactionsAmout.filter(item => item < 0)
            .reduce((accumulator,transaction) => accumulator + transaction,0).toFixed(2));
     
}

const getIcome = (transactionsAmout) => {
    transactionsAmout.filter(item => item > 0)
    .reduce((accumulator,transaction) => 
    accumulator + transaction,0).toFixed(2);
}

const totalAmount = (transactionsAmout) => {
    transactionsAmout.reduce
        ((accumulator, transaction) => 
          accumulator + transaction,0).toFixed(2);
}

// Pega somente os valores amounts do objeto
const updateBalanceValues = () =>{
     
    const transactionsAmout = transactions
     .map(transaction => transaction.amount); 
     
     
     const total = totalAmount(transactionsAmout);
    
     const income = getIcome(transactionsAmout);
   
     const expense = getExpenses(transactionsAmout);
     
    
     minusValue.textContent = `R$ ${expense}`;
     balance.textContent = `R$ ${total}`;
     plusValue.textContent = `R$ ${income}`
}
//Chama a cada loop as transações da função dummy quando o navegador
// é carregado.
const init = () =>{
    ulDomElement.innerHTML = "";
    transactions.forEach(addTransactionIntoDOM);
    updateBalanceValues();
}

init();

const updateLocalStorage = () =>{
    localStorage.setItem('transactions', JSON.stringify(transactions));
}


const generateID = () => Math.round(Math.random() * 1000);


const addToTransactionsArray = (transactionName,transactionsAmout) => {
    transactions.push({
        id:generateID(),
        name:transactionName,
        amount: Number(transactionsAmout)
    }    
    );
}

const clearInputs = () => {
    inpuTransactionName.value = "";
    inputTransactionAmount.value = "";
}


const handleFormSubmit = event =>{
    event.preventDefault(); // impedindo que o código seja enviado
    const transactionName = inpuTransactionName.value.trim();
    const transctionAmount = inputTransactionAmount.value.trim();
    
    if(inpuTransactionName.value.trim() ==='' || inputTransactionAmount.value.trim() === '' ){
        alert("Por favor, preencha tanto o nome quanto o valor da transação");
        return;
    }

    addToTransactionsArray(transactionName,transctionAmount);
    init();
    updateLocalStorage();

    clearInputs();
} 

form.addEventListener('submit', handleFormSubmit);