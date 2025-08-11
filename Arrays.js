// ========================
//  MÉTODOS ESTÁTICOS
// ========================


console.log(Array.from("Hola")); 


console.log(Array.isArray([1, 2, 3])); 


console.log(Array.of(7, 8, 9));

// ========================
//  AÑADIR / ELIMINAR
// ========================

let arreglo = [1, 2, 3];
arreglo.push(4);
console.log(arreglo);

arreglo.pop();
console.log(arreglo); 

arreglo.unshift(0);
console.log(arreglo); 

arreglo.shift();
console.log(arreglo);

arreglo.splice(1, 1, 99);
console.log(arreglo);


let arregloWith = arreglo.with(1, 42);
console.log(arregloWith);

// ========================
//  ACCESO / BÚSQUEDA
// ========================

let arreglo2 = [1, 2, 3, 4, 5];
console.log(arreglo2.at(-1)); 

console.log(arreglo2.concat([6, 7])); 

console.log(arreglo2.includes(3)); 

console.log(arreglo2.indexOf(3)); 
console.log(arreglo2.lastIndexOf(3)); 

console.log(arreglo2.find(x => x > 3)); 
console.log(arreglo2.findIndex(x => x > 3)); 

console.log(arreglo2.findLast(x => x < 3)); 
console.log(arreglo2.findLastIndex(x => x < 3)); 

console.log(arreglo2.slice(1, 3)); 

// ========================
//  ITERACIÓN / TRANSFORMACIÓN
// ========================

arreglo2.forEach(x => console.log(x * 2)); 

console.log(arreglo2.map(x => x * 2)); 

console.log(arreglo2.filter(x => x % 2 === 0)); 

console.log(arreglo2.reduce((acc, x) => acc + x, 0)); 

console.log(arreglo2.reduceRight((acc, x) => acc - x, 0));

console.log(arreglo2.every(x => x < 10)); 
console.log(arreglo2.some(x => x > 4)); 

console.log(arreglo2.flatMap(x => [x, x * 2])); 

console.log([...arreglo2.keys()]); 
console.log([...arreglo2.values()]); 
console.log([...arreglo2.entries()]); 

// ========================
//  ORDEN / COPIA
// ========================

let arreglo3 = [3, 1, 2];
arreglo3.sort();
console.log(arreglo3); 

arreglo3.reverse();
console.log(arreglo3); 

let sortedCopy = arreglo3.toSorted();
console.log(sortedCopy); 
console.log(arreglo3); 

let reversedCopy = arreglo3.toReversed();
console.log(reversedCopy); 
console.log(arreglo3); 

arreglo3.fill(0, 1, 3);
console.log(arreglo3); 

let arreglo4 = [1, 2, 3, 4, 5];
arreglo4.copyWithin(0, 3);
console.log(arreglo4); 

// ========================
//  CONVERSIÓN A STRING
// ========================

let arreglo5 = ["Hola", "mundo"];
console.log(arreglo5.join(" ")); 
console.log(arreglo5.toString()); 
console.log(arreglo5.toLocaleString()); 
