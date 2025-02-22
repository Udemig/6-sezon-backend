import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import DeleteButton from "../components/DeleteButton";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Detail = () => {
  const { id } = useParams();

  //id'si bilinen elemnaın bilgilerini api'den al
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["recipe"],
    queryFn: () =>
      api.get(`/api/v1/recipes/${id}`).then((res) => res.data.found),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <Link to={-1} className="btn flex items-center gap-2 py-1">
          <IoMdArrowRoundBack />
          Geri
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to={`/düzenle/${data?.id}`}
            className="btn flex gap-2 items-center bg-blue-500 hover:bh-blue-600 py-1 min-w-[80px] justify-center "
          >
            <MdEdit />
            Düzenle
          </Link>

          <DeleteButton />
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        data && (
          <div>
            <h1 className="title text-3xl"> {data.recipeName} </h1>
          </div>
        )
      )}
    </div>
  );
};

export default Detail;
