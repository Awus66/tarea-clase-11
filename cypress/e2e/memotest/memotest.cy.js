/// <reference types="Cypress" />

const URL = '127.0.0.1:8080/memotest/index.html';
const CANT_CUADROS = 12;

context('Memotest', () => {
    beforeEach(() => {
        cy.visit(URL);
    });

    describe('Verifica condiciones iniciales', () => {
        it (`Asegura que hayan ${CANT_CUADROS} cuadros en el tablero`, () => {
            cy.get('#tablero').find('.cuadro').should('have.length', CANT_CUADROS);
        });

        it ('Asegura que los cuadros estén ocultos', () => {
            cy.get('.cuadro').parent().should('have.class', 'oculto');
        });

        it ('Asegura que los cuadros sean aleatorios', () => {
            let clasesViejas = [];
            cy.get('.cuadro').then(cuadros => {
                cuadros.each((i, cuadro) => clasesViejas.push(cuadro.className));
            });

            cy.visit(URL);

            let clasesNuevas = [];
            cy.get('.cuadro').then(cuadros => {
                cuadros.each((i, cuadro) => clasesNuevas.push(cuadro.className));
            });

            cy.wrap(clasesViejas).should('not.deep.equal', clasesNuevas);
        });
    });

    
    describe('Juega al memotest', () => {
        let mapaPares, listaPares;

        it ('Elige un par erroneo', () => {
            cy.get('#tablero').find('.cuadro').then(cuadros => {
                mapaPares = obtenerPares(cuadros);
                listaPares = Object.values(mapaPares);
                listaPares[0][0].click();
                listaPares[1][0].click();
                cy.get('#tablero').find('.cuadro').should('have.length', CANT_CUADROS);
            });
        });

        it ('Asegura que no pase nada al clickear dos veces el mismo cuadro', () => {
            cy.get('#tablero').find('.cuadro').then(cuadros => {
                mapaPares = obtenerPares(cuadros);
                listaPares = Object.values(mapaPares);

                // Selecciona un cuadro y le hace dos clicks, luego le hace click a uno que no es su par
                cy.wrap(listaPares[0][0]).dblclick().then(() => listaPares[1][0].click());
                // Verifico que la cantidad de cuadros siga siendo 12
                cy.get('#tablero').find('.cuadro').should('have.length', CANT_CUADROS);
                // Verifico que la cantidad de turnos sea 1
                cy.get('#turnos').invoke('text').should('deep.equal', '1');
            });
        });

        it ('Resuelve el juego', () => {
            cy.get('#tablero').find('.cuadro').should('have.length', CANT_CUADROS).then((cuadros) =>{
                mapaPares = obtenerPares(cuadros);
                listaPares = Object.values(mapaPares);


                listaPares.forEach(par => {
                    cy.get(par[0]).click();
                    cy.get(par[1]).click();
                });
            });

            cy.get('#tablero').find('.cuadro').should('have.length', 0);
            cy.get('#tablero').should('not.be.visible');

            const numeroTurnos = (CANT_CUADROS / 2);
            cy.get('#fin-juego').should('be.visible').contains(`Fin del juego! Tardaste ${numeroTurnos} turnos en terminar.`);
        });
    });
});


function obtenerPares(cuadros) {
    const pares = {}

    cuadros.each((i, cuadro) => {
        const color = cuadro.className.replace('cuadro h-100 ', '');

        // Si pares[color] contiene algo significa que ya tiene un elemento dentro, y si no, significa que está vacío y su primer elemento debe ser cuadro
        if (pares[color]){
            pares[color].push(cuadro);
        }
        else {
            pares[color] = [] // Lo convierto en un array
            pares[color].push(cuadro);
        }
    });

    return pares;
}
