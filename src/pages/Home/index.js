import { useEffect, useState } from "react";
import api from "../../services/api";

function Home() {
  const [filmes, setFilmes] = useState([]);

  useEffect(()=>{
    async function loadFilme(){
        const response = await api.get("/movie/now_playing",{
            params:{
                api_key:'c1f9343990348acff5761df661d1fa66',
                language: "pt-BR",
                page:1,
            }
        })
        console.log(response.data.results.slice(0,10))
    }
    loadFilme()
  },[])
  return (
    <div>
      <h1> Welcome to Home Page</h1>
    </div>
  );
}

export default Home;
