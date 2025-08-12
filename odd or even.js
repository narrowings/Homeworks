function parOimpar(num) {
    if (num % 2 === 0) {
        console.log(`${num} es PAR`);
    } else {
        console.log(`${num} es IMPAR`);
    }
}


const parOimparFuncionFlecha = (num) => {
    console.log(num % 2 === 0 ? `${num} es PAR` : `${num} es IMPAR`);
};


parOimpar(8);       
parOimpar(7);        
parOimparFuncionFlecha(10);  
parOimparFuncionFlecha(19);  
