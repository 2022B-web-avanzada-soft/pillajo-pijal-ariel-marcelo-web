// 07-promesas.js

function promesaEsPar(numero) {
  const miPrimerPromesa = new Promise(
    (resolve, reject) => {
        if (numero % 2 == 0) {
            resolve(true);
        } else {
            reject(false);
        }
    }
  );
  return miPrimerPromesa;
}

function promesaElevarAlCuadrado(numero) {
    return new Promise((res) => res(Math.pom(numero, 2)));
}


promesaEsPar(5)
    .then( // try
        (data) => {
            console.log('data', data);
            return promesaElevarAlCuadrado(data);
        }
    )
    .then( // try
        (data) => {
            console.log('data', data);
            return promesaElevarAlCuadrado(data);
        }
    )
    .then( // try
        (data) => {
            console.log('data', data);
            return promesaElevarAlCuadrado(data);
        }
    )
    .catch( // catch
        (error)=>{
            console.log('error', error);
        }
    )
    .finally(
        () => {}
    );



