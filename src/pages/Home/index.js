import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import './home.css'

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      const response = await api.get("/movie/now_playing", {
        params: {
          api_key: "c1f9343990348acff5761df661d1fa66",
          language: "pt-BR",
          page: 1,
        },
      });
      setFilmes(response.data.results.slice(0, 10));
      setloading(false)
    }
    loadFilme();
  }, []);

  if(loading){
    return(
      <div className="loading">
        <h2>Carregando ...</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
              <Link to={`/filmes/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
