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
  const [editForm, setEditForm] = useState<any | null>(null);
  const [showForm, setShowForm] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(url);
      setCardData(result.data);
    };
    fetchData();
  }, []);

  const renderForm = (index: number) => {
    return (
      <form className="container__form">
        <input className="edit__title" placeholder="Title" value={cardData[index].title} />
        <textarea className="edit_description" placeholder="Description" value={cardData[index].description} />
        <input className="edit_img" placeholder="New image link" value={cardData[index].image} />
        <button className="btn">Update</button>
      </form>
    )
  }


  const handleEditBtn = (index: number) => {
    
    setShowForm((prevState) => ({
      ...prevState,
      [String(index)]: !prevState[String(index)],
    }));

    showForm[index] ? setEditForm(null): setEditForm(renderForm(index));
  }

  return (
    <div className='container__row'>
      {cardData.map((card, index) => (
        <div className='card' key={index}>
          <div className='container__row'>
            <div className='card__image'>
              { showForm[index] && editForm }
              <img src={card.image} alt={card.title} height='200px' />
            </div>
          </div>
          <div className='container__row'>
              <span className='card__title'>{card.title}</span>
            <div className='card__description'>{card.description}</div>
          </div>
          <div className='container__row'>
            <button className='btn' onClick={() => handleEditBtn(index)}>
              { showForm[index] ? 'Cancel' : 'Edit' }
              </button>
            <button className='btn'>Delete</button>
          </div>
        </div>
        ))}
    </div>
  );

}

export default RenderCards;
