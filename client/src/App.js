import React, { useState } from "react";
import FilingForm from "./components/FilingForm";
import FilingList from "./components/FilingList";
import "./App.css";

function App() {
  const [refreshList, setRefreshList] = useState(false);

  const handleSubmissionSuccess = () => {
    setRefreshList((prev) => !prev);
  };

  return (
    <div className="App">
      <h1>Customs Filing System</h1>
      <div className="container">
        <div className="form-section">
          <FilingForm onSuccess={handleSubmissionSuccess} />
        </div>
        <div className="list-section">
          <FilingList key={refreshList} />
        </div>
      </div>
    </div>
  );
}

export default App;
