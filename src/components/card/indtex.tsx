import React from "react";
interface CardProps {
  title: string;
}
const Card = ({ title }: CardProps) => {
  return <div className="bg-gray-200 p-4 m-1">{title}</div>;
};

export default Card;
