import { useState } from "react";
import { FiSearch } from "react-icons/fi"; //import de icones do react
import './style.css';
import api from './services/api';

function App() {

  //armazena o que foi digitado dentro de um estado
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {

    if (input === '') {
      alert("Não é possivel localizar um cep vazio!")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");

    } catch {
      alert("Erro ao buscar o cep!");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite o seu cep: "
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="fff"></FiSearch>
        </button>
      </div>

      
      {Object.keys(cep).length > 0 && ( // caso tenha algo no user state, apresenta as infos.
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span> {cep.logradouro}</span>
          <span> {cep.complemento}</span>
          <span> {cep.bairro} </span>
          <span> {cep.localidade} - {cep.uf}</span>

        </main>
      )}

    </div>
  );
}

export default App;
