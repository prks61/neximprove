import React, { useEffect, useState } from "react";
import axios from "axios";

const FilingList = () => {
  const [filings, setFilings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/filings");
        setFilings(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch filings");
      } finally {
        setLoading(false);
      }
    };

    fetchFilings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Submitted Filings</h2>
      <table>
        <thead>
          <tr>
            <th>Shipment ID</th>
            <th>Invoice Number</th>
            <th>Value</th>
            <th>Port</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filings.map((filing) => (
            <tr key={filing._id}>
              <td>{filing.shipmentId}</td>
              <td>{filing.invoiceNumber}</td>
              <td>{filing.invoiceValue}</td>
              <td>{filing.port}</td>
              <td>{filing.status}</td>
              <td>{new Date(filing.submissionDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilingList;
