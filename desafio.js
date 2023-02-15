const reservas = [
    {
        tipoHabitacion: "standard",
        desayuno: false,
        pax: 1,
        noches: 3
    },
    {
        tipoHabitacion: "standard",
        desayuno: false,
        pax: 1,
        noches: 4
    },
    {
        tipoHabitacion: "suite",
        desayuno: true,
        pax: 2,
        noches: 1
    }
];

//Lab: caso 01, caso02, desafio y ejercicio adicional.
//--- CASO 01 ---
//Cliente particular => Habitación / día (IVA No Incluido):
//  Standard: 100 €.
//  Suite: 150 €.
//      *Por cada persona adicional sumarle 40 € al precio de cada noche.
//      *IVA sumarle un 21% al total.

//--- CASO 02 ---
//Todas las habitaciones tienen el mismo precio (100 €).
//Adicionalmente se le aplica un 15 % de descuento a los servicios contratados.

//--- DESAFIO ---
//Crear una clase base con la funcionalidad común, y dos clases hijas una con el
// caso para cliente particular y otra para tour operador.

//--- EJERC ADICIONAL ---
//Añadimos un campo a cada reserva en el que indicamos si el desayuno está incluido o no:
//en caso de estar incluido supone un cargo adicional de 15 € por persona y noche.

class baseReserves {
    constructor() {
        this._listOfReserves = [];
        this._subtotal = 0;
        this._total = 0;
        this._tax = 1.21; // IVA = 21%
    }

    calcSubtotal(type) {
        this._listOfReserves.forEach(({ tipoHabitacion, noches, pax, desayuno }) => {
            (type === "particular" && tipoHabitacion === "suite")
                ? tipoHabitacion = 150 : tipoHabitacion = 100;

            this._subtotal +=
                (tipoHabitacion * noches) + ((40 * (pax - 1)) * noches);

            if (desayuno) this._subtotal += 15 * noches * pax; // +15€ por persona y noche
        })
    }

    calcTotal() {
        this._total = this._subtotal * this._tax
    }

    set reserv(reserv) {
        this._listOfReserves = reserv;
        this.calcSubtotal();
        this.calcTotal();
    }
    get subtotal() {
        return this._subtotal.toFixed(2);
    }
    get total() {
        return this._total.toFixed(2);
    }
};

// ---- cliente particular ----
class particularReserves extends baseReserves {
    calcSubtotal() {
        super.calcSubtotal("particular") // suite:150 - standard:100
    }
};

// ---- tour operador ----
class tourOperador extends baseReserves {
    calcSubtotal() {
        super.calcSubtotal("tourOp"); // habs. 100€
    }

    calcTotal() {
        super.calcTotal();
        this._total = this._total * 0.85 // descuento del 15%
    }
}

console.log("----- Particular -----");
const particularReserv = new particularReserves;
particularReserv.reserv = reservas;
console.log("Base Reserv -> Subtotal: " + particularReserv.subtotal + " €");
console.log("Base Reserv -> Total: " + particularReserv.total + " €");

console.log("----- Tour Op -----");
const tourOpReserv = new tourOperador;
tourOpReserv.reserv = reservas;
console.log("Base Reserv -> Subtotal: " + tourOpReserv.subtotal + " €");
console.log("Base Reserv -> Total: " + tourOpReserv.total + " €");