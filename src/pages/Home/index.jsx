import React, { useState, useEffect } from 'react'; 
import './styles.css';

import { Card } from '../../components/Card'

export function Home() {
  //Utilizando estado
  const [studentName, setStudentName] = useState(''); //Declarando useState para setar o convidado cadastrado
  const [students, setStudents] = useState([]); //Declarando useState para manipular os convidados cadastrados
  const [user, setUser] = useState({name: '', avatar: ''}); //Declarando useState para manipular user Github

  // Criando function com objeto sempre que estanciada, vai criar e setar no state setStudentName
  function hadleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };
    //Adiciona o stateAnterior + newState
    setStudents(prevState => [...prevState, newStudent]);
  }

  // Corpo do useEffect utilizado quando a interface é renderizado
  useEffect(() => {
    // Consultando API e passando no useState setUser
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/gs7joao')
      const data = await response.json();
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }
    // fetch('https://api.github.com/users/gs7joao')
    // .then(response => response.json())
    // .then(data => {
    //   setUser({
    //     name: data.name,
    //     avatar: data.avatar_url
    //   })
    // })
    fetchData();
  }, [])

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença Churrasco</h1>
        <div>
            <strong>{user.name}</strong>
            <img src={user.avatar} alt="Foto de Perfil" />
        </div>
      </header>

      <input 
        type="text"
        placeholder="Digite um nome..."
        onChange={e => setStudentName(e.target.value)} //Passando o valor atual do input pelo useState
      />
      <button type="button" onClick={hadleAddStudent}>
        Adicionar
      </button>

      {
        students.map(student => (
          <Card 
            key={student.time}
            name={student.name}
            time={student.time
          }/>
        ))
      }
    </div>
  )
}