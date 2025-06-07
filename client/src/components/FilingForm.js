import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const FilingForm = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      shipmentId: "",
      invoiceNumber: "",
      invoiceValue: "",
      port: "",
      items: [{ description: "", quantity: "", value: "" }],
    },
    validationSchema: Yup.object({
      shipmentId: Yup.string().required("Required"),
      invoiceNumber: Yup.string().required("Required"),
      invoiceValue: Yup.number()
        .min(0, "Must be positive")
        .required("Required"),
      port: Yup.string().required("Required"),
      items: Yup.array().of(
        Yup.object().shape({
          description: Yup.string().required("Description required"),
          quantity: Yup.number()
            .min(1, "Must be at least 1")
            .required("Required"),
          value: Yup.number().min(0, "Must be positive").required("Required"),
        })
      ),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError(null);
      try {
        const response = await axios.post(
          "http://localhost:5000/api/filings",
          values
        );
        onSuccess(response.data);
        formik.resetForm();
      } catch (err) {
        setError(err.response?.data?.error || "Submission failed");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const addItem = () => {
    formik.setFieldValue("items", [
      ...formik.values.items,
      { description: "", quantity: "", value: "" },
    ]);
  };

  const removeItem = (index) => {
    const items = [...formik.values.items];
    items.splice(index, 1);
    formik.setFieldValue("items", items);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2>Customs Filing Form</h2>

      {error && <div className="error">{error}</div>}

      <div>
        <label htmlFor="shipmentId">Shipment ID</label>
        <input
          id="shipmentId"
          name="shipmentId"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.shipmentId}
        />
        {formik.touched.shipmentId && formik.errors.shipmentId ? (
          <div className="error">{formik.errors.shipmentId}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="invoiceNumber">Invoice Number</label>
        <input
          id="invoiceNumber"
          name="invoiceNumber"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.invoiceNumber}
        />
        {formik.touched.invoiceNumber && formik.errors.invoiceNumber ? (
          <div className="error">{formik.errors.invoiceNumber}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="invoiceValue">Invoice Value</label>
        <input
          id="invoiceValue"
          name="invoiceValue"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.invoiceValue}
        />
        {formik.touched.invoiceValue && formik.errors.invoiceValue ? (
          <div className="error">{formik.errors.invoiceValue}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="port">Port</label>
        <input
          id="port"
          name="port"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.port}
        />
        {formik.touched.port && formik.errors.port ? (
          <div className="error">{formik.errors.port}</div>
        ) : null}
      </div>

      <h3>Items</h3>
      {formik.values.items.map((item, index) => (
        <div key={index} className="item-row">
          <div>
            <label>Description</label>
            <input
              name={`items[${index}].description`}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={item.description}
            />
            {formik.touched.items?.[index]?.description &&
            formik.errors.items?.[index]?.description ? (
              <div className="error">
                {formik.errors.items[index].description}
              </div>
            ) : null}
          </div>

          <div>
            <label>Quantity</label>
            <input
              name={`items[${index}].quantity`}
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={item.quantity}
            />
            {formik.touched.items?.[index]?.quantity &&
            formik.errors.items?.[index]?.quantity ? (
              <div className="error">{formik.errors.items[index].quantity}</div>
            ) : null}
          </div>

          <div>
            <label>Value</label>
            <input
              name={`items[${index}].value`}
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={item.value}
            />
            {formik.touched.items?.[index]?.value &&
            formik.errors.items?.[index]?.value ? (
              <div className="error">{formik.errors.items[index].value}</div>
            ) : null}
          </div>

          {formik.values.items.length > 1 && (
            <button type="button" onClick={() => removeItem(index)}>
              Remove
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addItem}>
        Add Item
      </button>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Filing"}
      </button>
    </form>
  );
};

export default FilingForm;
