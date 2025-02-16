import { useQuery } from "@tanstack/react-query";
import api from "../api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";
import Sort from "../components/Sort";
import Search from "../components/Search";
import { useState } from "react";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  //api'dan tarif verilerini al
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["recipes"],
    queryFn: () => api.get("/api/v1/recipes").then((res) => res.data.recipes),
  });
  console.log(isLoading, error, data);
  return (
    <main className="overflow-y-auto">
      <Search setSearchTerm={setSearchTerm} />
      <section>
        <section>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Error info={error.message} refetch={refetch} />
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h1 className="text-3xl my-5"> {data.length} tarif bulundu </h1>

                <Sort />
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {data.map((i, key) => (
                  <Card key={i.id} recipe={i} />
                ))}
              </div>
            </>
          )}
        </section>
      </section>
    </main>
  );
};

export default Home;
