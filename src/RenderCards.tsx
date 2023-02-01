import { useState, useEffect } from 'react'
import axios from 'axios';
import './RenderCards.css'

const RenderCards = () => {

  type Fruits = {
    id: number
    title: string
    description: string
    image: string;
  }[]

  const url = 'http://localhost:3004/fruits/';

  const [cardData, setCardData] = useState<Fruits[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(url);
      setCardData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className='container__row'>
      {cardData.map(card => (
        <div className='card' key={card.id}>
          <div className='container__row'>
            <div className='card__image'>
              <img src={card.image} alt={card.title} height='200px' />
            </div>
          </div>
          <div className='container__row'>
              <span className='card__title'>{card.title}</span>
            <div className='card__description'>{card.description}</div>
          </div>
          <div className='container__row'>
            <button className='btn'>Edit</button>
            <button className='btn'>Delete</button>
          </div>
        </div>
        ))}
    </div>
  );

}

export default RenderCards;
