"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import useCardStore from "@/store/product-store"


interface PizzaProps {
  id: number
  category: string
  name: string
  price: number
  image: string
  description: string
}

export default function Pizza({ id, name, price, image, description }: PizzaProps) {
  const [count, setCount] = useState(1)
  const fixPrice = price
  const [prices, setPrice] = useState(fixPrice)
  const [imgSize, setImgSize] = useState("1")
  const [size, setSize] = useState("S")
  const addToCard = useCardStore((state) => state.addToCard)

  useEffect(() => {
    setPrice(Number((count * fixPrice).toFixed(2)))
  }, [count, fixPrice])

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  const handleImgSize = (sizeSelect: string) => {
    setImgSize(sizeSelect)
    setSize(sizeSelect === "1" ? "S" : sizeSelect === "1.2" ? "M" : "L")
  }

  const handleOrder = () => {
    const newOrder = {
      id,
      image,
      name,
      size,
      price: prices,
      count,
    }
    addToCard(newOrder)
  }

  return (
    <div className="p-2">
      <div className="pizza-item dark-gradient rounded-[20px] p-4 flex flex-col items-center justify-center gap-[15px]">
        <div className="relative w-full h-40 overflow-hidden">
          <Image
            src={`http://localhost:3000${image}` || "/placeholder.svg"}
            alt={name}
            fill
            style={{ objectFit: "contain", transform: `scale(${imgSize})` }}
          />
        </div>
        <h3 className="text-2xl font-bold text-natural">{name}</h3>
        <p className="text-sm text-info text-center h-12 overflow-hidden">{description}</p>

        <div className="pizza-size flex justify-center gap-[15px]">
          <span
            className={`w-[50px] h-[50px] flex items-center justify-center rounded-full cursor-pointer border-2 ${
              size === "S"
                ? "bg-secondary border-secondary text-inky"
                : "border-info text-info hover:bg-secondary hover:border-secondary hover:text-natural hover:font-bold"
            }`}
            onClick={() => handleImgSize("1")}
          >
            S
          </span>
          <span
            className={`w-[50px] h-[50px] flex items-center justify-center rounded-full cursor-pointer border-2 ${
              size === "M"
                ? "bg-secondary border-secondary text-inky"
                : "border-info text-info hover:bg-secondary hover:border-secondary hover:text-natural hover:font-bold"
            }`}
            onClick={() => handleImgSize("1.2")}
          >
            M
          </span>
          <span
            className={`w-[50px] h-[50px] flex items-center justify-center rounded-full cursor-pointer border-2 ${
              size === "L"
                ? "bg-secondary border-secondary text-inky"
                : "border-info text-info hover:bg-secondary hover:border-secondary hover:text-natural hover:font-bold"
            }`}
            onClick={() => handleImgSize("1.3")}
          >
            L
          </span>
        </div>

        <div className="btn-ingridient flex items-center justify-center text-sm w-[200px] h-[40px] text-primary border-2 border-primary rounded-[20px] cursor-pointer transition-all duration-200 hover:bg-primary hover:text-natural hover:font-bold">
          + Ingredients
        </div>

        <div className="pizza-price flex justify-between items-center w-full gap-[30px]">
          <div className="price text-2xl font-medium text-natural">${prices}</div>
          <div className="count flex items-center">
            <button
              onClick={handleDecrement}
              className="w-[40px] h-[40px] rounded-full border-2 border-info text-natural bg-transparent transition-all duration-200 hover:bg-secondary hover:border-secondary"
            >
              -
            </button>
            <span className="mx-3 text-2xl text-natural">{count}</span>
            <button
              onClick={() => setCount(count + 1)}
              className="w-[40px] h-[40px] rounded-full border-2 border-info text-natural bg-transparent transition-all duration-200 hover:bg-secondary hover:border-secondary"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleOrder}
          className="btn-order flex items-center justify-center w-[200px] h-[40px] mt-2 mb-5 rounded-[20px] bg-secondary text-inky transition-all duration-200 hover:bg-primary hover:font-bold"
        >
          Order Now
        </button>
      </div>
    </div>
  )
}



