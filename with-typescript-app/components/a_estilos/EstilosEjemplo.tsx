import styles from "./estilos.module.css";

export function EstilosEjemplo() {
    const misEstilos = {
        color: "red",
        fontSize: "20px",
        backgroundColor: "yellow"
    }
  return (
    <div>
      <h1>Estilos en React</h1>
      <p className={styles.rojo}> Estilos en React</p>
        <p style={misEstilos}> Estilos EN VARIABLES</p>
    </div>
  )
}