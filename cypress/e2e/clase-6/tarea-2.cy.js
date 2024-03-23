/// <reference types="Cypress" />

const URL = '127.0.0.1:8080/clase-6/tarea2.html';

context('Formulario de sueldos de familiares',{ testIsolation: false }, () =>{
    before(() =>{
        cy.visit(URL);
    });

    describe('Completa el formulario', () =>{
        it ('Prueba boton quitar', () => {
            cy.get('form').find('#boton-agregar').click().then(() => {
                cy.get('form').find('#boton-quitar').should('be.visible');
                cy.get('form').find('.familiar').should('have.length', 1);
                cy.get('form').find('#boton-quitar').click().then(() => {
                    cy.get('form').find('#boton-quitar').should('not.be.visible');
                    cy.get('form').find('.familiar').should('have.length', 0);
                });
            });
        });

        it ('Prueba boton resetear', () => {
                cy.get('form').find('#boton-agregar').click().click().then(() => {
                    cy.get('form').find('.familiar').should('have.length', 2);
                    cy.get('form').find('#boton-resetear').should('be.visible');
                    cy.get('form').find('#boton-resetear').click().then(() => {
                        cy.get('form').find('#boton-resetear').should('not.be.visible');
                        cy.get('form').find('#familiares').should('not.be.visible');
                        cy.get('form').find('.familiar').should('have.length', 0);
                    });
                });
            });

        it('Agrega familiares', () => {
            const CANT_FAMILIARES = 5;
            for (let i=0; i < CANT_FAMILIARES; i++){
                cy.get('form').find('#boton-agregar').click();
            }
            cy.get('form').find('.familiar').should('have.length', CANT_FAMILIARES);
            cy.get('form').find('#boton-agregar').should('be.visible');
        });

        it ('Calcula sueldos incorrectos', () => {
            cy.get('form').find('.familiar').then(familiares => {
                familiares.each((i, familiar) => {
                    cy.get('form').find('#integrante'+(i+1)).invoke('val', Number(`${-2 * i}`));
                });
            });

            cy.get('form').find('#boton-calcular').click().then(() => {
                cy.get('form').find('.error').should('have.length', 5);
                cy.get('form').find('#errores').should('have.text', 'El sueldo debe ser un número positivo.');
            });
        });

        it ('Calcula sueldos correctos', () => {
            cy.get('form').find('.error').then(campos =>{
                campos.each((i, campo) => {
                    cy.wrap(campo).clear().then(campo =>{
                        cy.wrap(campo).invoke('val', Number(`${2 * (i+1)}`));
                    });
                });
            });
            cy.get('form').find('#boton-calcular').click().then(() => {
                cy.get('form').find('.error').should('have.length', 0);
                cy.get('form').find('#errores').should('have.text', '');
                cy.get('form').find('#mayor-sueldo').should('have.text', 'El mayor sueldo es 10');
                cy.get('form').find('#menor-sueldo').should('have.text', 'El menor sueldo es 2');
                cy.get('form').find('#promedio-sueldo').should('have.text', 'El promedio de sueldo es 6');
            });
        });
    });
});
