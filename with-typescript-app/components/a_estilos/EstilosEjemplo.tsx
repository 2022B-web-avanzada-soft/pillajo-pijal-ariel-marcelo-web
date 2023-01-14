import styles from "./estilos.module.css";
// Los estilos deben tener el  nombre module.css
import styled   from "@emotion/styled";
// Existen styled components para los cuales se necesita intalar
// npm i @emotion/react @emotion/styled
// Styled components es una libreria que permite crear componentes
// con estilos propios
// https://styled-components.com/
// pOR EJEMPLO:
const Titulo = styled.h1`
    color: red;
    font-size: 50px;
    color: orange;
`;
const Subtitulo = styled.h1`
    color: green;
    font-size: 50px;
    color: orange;
`;

export function EstilosEjemplo() {
    const misEstilos = {
        color: "red",
        fontSize: "20px",
        backgroundColor: "yellow"
    }
  return (
    <div>
        <Titulo> Titulo </Titulo>
        <Subtitulo> Subtitulo  </Subtitulo>
      <h1   style={
          {
              color:  misEstilos.color,
              fontSize: misEstilos.fontSize,
              backgroundColor: misEstilos.backgroundColor
          }
      }
      >Estilos en React Con valores  </h1>
      <p className={styles.rojo}> Estilos en React</p>
        <p style={misEstilos}> Estilos EN VARIABLES</p>
    </div>
  )
}