import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/cookie", {
          withCredentials: true,
        });
        setResponseData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {responseData && (
        <div>
          <p>Response data:</p>
          <pre style={{ textAlign: "left", display: "inline-block" }}>
            {JSON.stringify(responseData, null, 2)}
          </pre>
        </div>
      )}
    </>
  );
}
