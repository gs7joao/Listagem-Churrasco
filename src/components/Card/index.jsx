import './styles.css'
//Criando Components e passando as propriedades
export function Card(props) {
    return(
        <div className="card">
            <strong>{props.name}</strong>
            <small>{props.time}</small>
        </div>
    ) 
}