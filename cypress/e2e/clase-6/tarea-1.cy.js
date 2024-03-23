/// <reference types="Cypress" />

const URL = '127.0.0.1:8080/clase-6/tarea1.html';

context('Formulario de edades de familiares',{ testIsolation: false }, () =>{
    before(() =>{
        cy.visit(URL);
    });

    describe('Completa el formulario', () =>{
        it('Ingresa un input incorrecto', () => {
            cy.get('form').find('#cantidad-familiares').type('-4').then(() => {
                cy.get('form').find('#boton-enviar').click().then(() => {
                    cy.get('form').find('#errores').should('have.text', 'La cantidad de familiares debe ser un número entero entre 1 y 99');
                });
            });
        });

        it ('Prueba boton resetear', () => {
            cy.get('form').find('#cantidad-familiares').clear();
            cy.get('form').find('#cantidad-familiares').type('3').then(() =>{
                cy.get('form').find('#boton-enviar').click().then(() => {
                    cy.get('form').find('#boton-resetear').should('be.visible');
                    cy.get('form').find('#boton-resetear').click().then(() => {
                        cy.get('form').find('#boton-resetear').should('not.be.visible');
                        cy.get('form').find('#familiares').should('not.be.visible');
                        cy.get('form').find('.familiar').should('have.length', 0);
                    });
                });
            });
        });

        it('Envia familiares', () => {
            cy.get('form').find('#cantidad-familiares').type('4').invoke('val').then(familiares =>{
                cy.get('form').find('#boton-enviar').click().then(() =>{
                    cy.get('form').find('#familiares').should('be.visible');
                    cy.get('form').find('#boton-enviar').should('not.be.visible');
                    cy.get('form').find('.familiar').should('have.length', Number(familiares));
                });
            });
        });

        it ('Ingresa edades incorrectas', () => {
            cy.get('form').find('.edad').then(familiares => {
                familiares.each((i, familiar) => {
                    cy.wrap(familiar).type(`${-2 * i}`);
                });
            });

            cy.get('form').find('#boton-calcular').click().then(() => {
                cy.get('form').find('.error').should('have.length', 3);
                cy.get('form').find('#errores').should('have.text', 'La edad debe ser un número entero entre 0 y 120.');
            });
        });

        it ('Calcula edades correctas', () => {
            cy.get('form').find('.error').then(campos =>{
                campos.each((i, campo) => {
                    cy.wrap(campo).clear().then(campo =>{
                        cy.wrap(campo).type(`${2 * i+1}`);
                    });
                });
            });
            cy.get('form').find('#boton-calcular').click().then(() => {
                cy.get('form').find('.error').should('have.length', 0);
                cy.get('form').find('#errores').should('have.text', '');
                cy.get('form').find('#mayor-edad').should('have.text', 'La mayor edad es 5');
                cy.get('form').find('#menor-edad').should('have.text', 'La menor edad es 0');
                cy.get('form').find('#promedio-edad').should('have.text', 'El promedio de edad es 2.25');
            });
        });
    });
});
