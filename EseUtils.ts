const ON_DOUBLE_CLICK_ID = 4000;
const ON_DOUBLE_CLICK_A_VALUE = 1;
const ON_DOUBLE_CLICK_B_VALUE = 2;
const ON_CLICK_ID = 4001;
const ON_CLICK_A_VALUE = 1;
const ON_CLICK_B_VALUE = 2;

//% color="#AA278D" icon="\uf11b" block="EseUtils"
namespace EseUtils {


    /**
     * Cuando ocurra un doble click boton A llamar a un bloque
     * @param handler La funcion a llamar
     */
    //% block="on double click A"
    export function onDoubleClickA(handler: () => void): void {
        control.onEvent(ON_DOUBLE_CLICK_ID, ON_DOUBLE_CLICK_A_VALUE, handler);
    }

    /**
     * Cuando ocurra un doble click boton B llamar a un bloque
     * @param handler La funcion a llamar
     */
    //% block="on double click B"
    export function onDoubleClickB(handler: () => void): void {
        control.onEvent(ON_DOUBLE_CLICK_ID, ON_DOUBLE_CLICK_B_VALUE, handler);
    }
    /**
     * Cuando ocurra un click del boton A llamar a un bloque, USA ESTE METODO, no el estandar
     * @param handler La funcion a llamar
     */
    //% block="on click A"
    export function onClickA(handler: () => void): void {
        control.onEvent(ON_CLICK_ID, ON_CLICK_A_VALUE, handler);
    }
    /**
     * Cuando ocurra un click del boton B llamar a un bloque, USA ESTE METODO, no el estandar
     * @param handler La funcion a llamar
     */
    //% block="on click B"
    export function onClickB(handler: () => void): void {
        control.onEvent(ON_CLICK_ID, ON_CLICK_B_VALUE, handler);
    }
}

let lastClickTimes: number[] = [0, 0];
let doubleClickActive: boolean[] = [false, false,];
const ClickDiference = 500; // Ajustar despues
function OnClick(clickId: number) {
    if (lastClickTimes[clickId - 1] != 0 && (input.runningTime() - lastClickTimes[clickId - 1] < ClickDiference)) {
        control.raiseEvent(ON_DOUBLE_CLICK_ID, clickId);
        doubleClickActive[clickId - 1] = true;
        lastClickTimes[clickId - 1] = 0;
    } else {
        lastClickTimes[clickId - 1] = input.runningTime();
        control.runInParallel(() => {
            pause(ClickDiference);

            if (doubleClickActive[clickId - 1]) {
                doubleClickActive[clickId - 1] = false;
            } else {
                control.raiseEvent(ON_CLICK_ID, clickId);
            }
        })
    }
}
function OnClickA(): void {
    OnClick(ON_CLICK_A_VALUE);
}
function OnClickB(): void {
    OnClick(ON_CLICK_B_VALUE);
}

control.onEvent(1, 3, OnClickA)
control.onEvent(2, 3, OnClickB)