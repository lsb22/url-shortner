import { z } from "zod";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "../services/api-client";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

const schema = z.object({
  // for schema based form validation
  url: z
    .string()
    .min(15, { message: "url should be of atleast 15 characters long" }),
});

type urlData = z.infer<typeof schema>;

interface urlSchema {
  orgUrl: string;
  shortUrl: string;
  clicks: number;
  createdDate: Date;
  userId: string;
  _id?: string;
}

const HomePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<urlData>({ resolver: zodResolver(schema) });
  const { userId } = useParams();
  const [urls, setUrls] = useState<urlSchema[]>([]);

  const handleFormSubmit = (data: urlData) => {
    apiClient
      .post("/url/" + userId, data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setUrls([...urls, res.data.newUrl]))
      .catch((err) => alert(err.response.data.messsage));
  };

  useEffect(() => {
    apiClient
      .get("/url/" + userId, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => setUrls([...urls, ...res.data.urls]))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center h-80 justify-center">
        <h1 className="text-5xl font-bold mb-10">
          Shorten your{" "}
          <span className="bg-yellow-100 text-black rounded-lg">
            Loooooooong
          </span>{" "}
          Url's
        </h1>
        <div className="flex">
          <form
            onSubmit={handleSubmit((data) => {
              reset();
              handleFormSubmit(data);
            })}
          >
            <input
              type="text"
              placeholder="your url"
              className="bg-white border-2 rounded-lg text-black p-2"
              {...register("url")}
            />
            <button className="bg-white text-black pt-2 pb-2 pr-3 pl-3 border-3 rounded-md ml-0.5">
              Shorten now
            </button>
          </form>
        </div>
        {errors.url && <p className="text-red-200">{errors.url.message}</p>}
      </div>
      <div className="">
        {urls.length !== 0 &&
          urls.map((url, idx) => (
            <p key={idx}>{url.orgUrl + " --> " + url.shortUrl}</p>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
