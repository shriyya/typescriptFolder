import React, { useEffect, useState } from "react";
import TableView from "./components/TableView";
import api from "./Api";
type dataFormate = { userId: number; id: number; title: string; body: string };

function App() {
  const [value, chageValue] = useState<dataFormate[]>([]);

  useEffect(() => {
    const getValue = async () => {
      await api
        .valueGet()
        .then((result) => {
          return result.json();
        })
        .then((res) => {
          chageValue(res);
        });
    };
    getValue();
  }, []);
  return (
    <div style={{ padding: "40px" }}>
      <TableView data={value} />
    </div>
  );
}

export default App;
