//% color="#AA278D" icon="\uf11b" block="Mi Extensión"
namespace miExtension {

    /**
     * Este bloque hace algo increíble
     * @param v el valor a mostrar
     */
    //% block="mostrar valor %v"
    export function mostrarValor(v: number): void {
        basic.showNumber(v)
    }
}