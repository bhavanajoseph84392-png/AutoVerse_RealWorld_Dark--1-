import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import CarForm from "./CarForm";

function EditCar() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  useEffect(() => { api.get(`/cars/${id}`).then((res) => setCar(res.data)); }, [id]);
  return car ? <CarForm mode="edit" initialData={car} /> : <div className="page-container empty-state">Loading...</div>;
}
export default EditCar;
