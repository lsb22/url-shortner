import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import useUrlStore from "../store/urlStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Data {
  date: string;
  clicks: number;
}

const Statistics = () => {
  const [data, setData] = useState<Data[]>([]);
  const { urls } = useUrlStore();

  const handleUrlClick = (shortUrl: string) => {
    console.log(shortUrl);
    apiClient
      .post(
        "/click/shrturl",
        { shortUrl: shortUrl },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setData(res.data.urls);
        console.log(res.data.urls);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (urls.length === 0) return;

    apiClient
      .post(
        "/click/shrturl",
        { shortUrl: urls[0].shortUrl },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => setData([...data, ...res.data.urls]))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="relative overflow-x-auto shadow-xl p-10">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 w-100">
                Original Url
              </th>
              <th scope="col" className="px-6 py-3">
                Short Url
              </th>
              <th scope="col" className="px-6 py-3">
                Total clicks
              </th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {urls?.map((url, idx) => (
              <tr
                key={idx}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
              >
                <td className="px-6 py-4">
                  <button onClick={() => handleUrlClick(url.shortUrl)}>
                    {url.orgUrl}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleUrlClick(url.shortUrl)}>
                    {url.shortUrl}
                  </button>
                </td>
                <td className="px-6 py-4">{url.clicks}</td>
                <td className="px-6 py-4">
                  {new Date(url.createdDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length !== 0 && (
        <div className="chart-display">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="clicks" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Statistics;
