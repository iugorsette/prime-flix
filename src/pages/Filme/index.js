import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../services/api";

function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "c1f9343990348acff5761df661d1fa66",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
        })
        .catch(() => {
          console.log(`filme nao encontrado`);
        });
    }
    loadFilme();
    setloading(false);
  }, []);

  if (loading) {
    return (
      <div className="filme-info">
        <h1> Carregando detalhes...</h1>
      </div>
    );
  }
  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3>Sinopse</h3>
      <p>{filme.overview}</p>

        <strong>{filme.vote_average}</strong>

    </div>
  );
}

export default Filme;
