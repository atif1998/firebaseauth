import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "reactstrap";

export default function UserData() {
  const email = localStorage.getItem("email");
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
    return () => {
      setData([]);
    };
  }, [email]);

  const logout = () => {
    window.location.reload();
  };
  const getData = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8090/api/user/getByEmail/?email=${email}`
      );
      setData(res.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div>
      {data.map((i) => (
        <div
          key={i.id}
          style={{
            padding: 16,
            border: 2,
            margin: 8,
            backgroundColor: "#f9f9f9",
          }}
        >
          <div style={{ fontWeight: 500 }}>Name: {i.displayName}</div>
          <div style={{ fontWeight: 500 }}>Email: {i.email}</div>
          <div style={{ fontWeight: 500 }}>Age: {i.age}</div>
          <div style={{ fontWeight: 500 }}>Gender: {i.gender}</div>
        </div>
      ))}
      <Button
        style={{
          marginTop: 16,
          backgroundColor: "#007bff",
          color: "#fff",
          padding: 16,
          cursor: "pointer",
          width: 500,
          borderRadius: 60,
        }}
        onClick={logout}
      >
        LogOut
      </Button>
    </div>
  );
}
