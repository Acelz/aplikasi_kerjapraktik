import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailVechiclePage = () => {
  const { id } = useParams();
  return (
    <>
      <div>{id}</div>
    </>
  );
};

export default DetailVechiclePage;
