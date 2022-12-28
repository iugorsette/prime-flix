import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./filme-info.css";

import api from "../../services/api";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

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
          setloading(false);
        })
        .catch(() => {
          console.log("filme nao encontrado");
          navigate("/", { replace: true });
          return;
        });
    }
    loadFilme();
  }, [id, navigate]);

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
      <span>{filme.overview}</span>
      <strong>Avaliacao: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button>Salvar</button>
        <button>
          <a
            target="blank"
            href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
            rel="externo"
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Filme;
