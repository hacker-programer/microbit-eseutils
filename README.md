# 🛠️ EseUtils - Eventos Pro para micro:bit

Esta extensión añade superpoderes a tus botones. Permite detectar **clics simples** y **dobles clics** sin que la micro:bit se confunda.

---

## 🧒 Sección para Humanos (Bloques)
*Ideal para niños, principiantes y gente que no quiere quemarse la cabeza.*

### ⚠️ REGLA DE ORO
Si usas esta extensión, **NO uses los bloques rojos normales de "al presionar el botón A"**. 
Si los mezclas, tu programa hará cosas raras (como activar el clic simple cuando querías hacer doble clic). Usa **solo** los bloques de color morado de **EseUtils**.

### 📦 Cómo instalarlo
1. Entra a [MakeCode](https://makecode.microbit.org/).
2. Dale a **Extensiones** (en el engranaje ⚙️).
3. Pega este link: `https://github.com/hacker-programer/microbit-eseutils`

### 🎮 Cómo usar los bloques
- **on click A / B**: Úsalo para lo que quieras que pase cuando tocas el botón una vez.
- **on double click A / B**: Úsalo para lo que pase cuando tocas el botón dos veces muy rápido.

---

## 💻 Sección para Programadores (JavaScript / TypeScript)
*Especificaciones técnicas para los que no arrastran bloques.*

EseUtils implementa un sistema de **Debouncing y State Machine** basado en hilos paralelos (`fibers`) para separar la lógica de entrada.

### Lógica de Eventos
La extensión utiliza el sistema de mensajería de CODAL/DAL para no bloquear el bucle principal. Al detectar un flanco de subida en los botones (ID 1 o 2, valor 3), se dispara un proceso de confirmación:

1. **Primer Clic:** Registra el `timestamp` actual y lanza un hilo paralelo (`control.runInParallel`).
2. **Espera:** El hilo espera 500ms (`ClickDifference`).
3. **Confirmación:**
   - Si se detecta un segundo clic antes de los 500ms, se dispara un evento de **Doble Clic** y se cancela la marca del simple.
   - Si pasan los 500ms sin un segundo impacto, se dispara el evento de **Clic Simple**.



### Especificaciones de IDs y Valores
Si prefieres usar `control.onEvent` directamente, estos son los registros:

| Evento | ID | Valor A | Valor B |
| :--- | :--- | :--- | :--- |
| **Doble Clic** | `4000` | `1` | `2` |
| **Clic Simple** | `4001` | `1` | `2` |

---

## 📝 Ejemplos de uso

### En Bloques
*(Arrastra los bloques de EseUtils en lugar de los de Input)*

### En TypeScript
```typescript
// Doble clic para lanzar un misil
EseUtils.onDoubleClickA(() => {
    basic.showIcon(IconNames.Target)
})

// Clic simple para saludar
EseUtils.onClickA(() => {
    basic.showString("Hola")
})
