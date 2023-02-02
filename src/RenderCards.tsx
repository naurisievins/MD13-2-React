import { useState, useEffect, useLayoutEffect } from 'react'
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
  const [showForm, setShowForm] = useState<number | null>(null);
  const [editFormTitle, setEditFormTitle] = useState<string>();
  const [editFormImage, setEditFormImage] = useState<string>();
  const [editFormDescription, setEditFormDescription] = useState<string>();

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(jsonData => setCardData(jsonData));
  }, []);

  const handleDeleteBtn = (id: number) => {
    const deleteIndex = cardData.findIndex(card => card.id === id);
    const newData = cardData.filter((_, index) => index !== deleteIndex);
    setCardData(newData);
  }

  const handleEditBtn = (id: number) => {
    setShowForm(id)

    const item = cardData.find((item) => item.id === id);
    setEditFormTitle(item?.title);
    setEditFormDescription(item?.description);
    setEditFormImage(item?.image);
  }

  const handleCancelBtn = () => {
    setShowForm(null)
  }

  const handleUpdateBtn = () => {
    setCardData(prevData =>
      prevData.map(item => {
        if (item.id === showForm) {
          return { ...item, title: editFormTitle, image: editFormImage, description: editFormDescription };
        }
        return item;
      })
    );
    setShowForm(null);
    setEditFormTitle('');
    setEditFormImage('');
    setEditFormDescription('');
  };

  const handleAddBtn = () => {
    console.log('add');
    
  }

  return (
    <div className='container__row'>
      {cardData.map((card) => (
        <div className='card' key={card.id}>
          <div className='container__row'>
          { showForm === card.id && (
            <form className="container__form">
              <input className="edit__title" placeholder='Title' value={editFormTitle} onChange={e => setEditFormTitle(e.target.value)}  />
              <textarea className="edit_description" placeholder="Description" value={editFormDescription} onChange={e => setEditFormDescription(e.target.value)} />
              <input className="edit_img" placeholder="New image link" value={editFormImage} onChange={e => setEditFormImage(e.target.value)} />
              <button className="btn" onClick={(e) => {
                e.preventDefault();
                handleUpdateBtn();
              }}>
                Update
              </button>
            </form>
              )}
            <div className='card__image'>
              <img src={card.image} alt={card.title} height='200px' />
            </div>
          </div>
          <div className='container__row'>
              <span className='card__title'>{card.title}</span>
            <div className='card__description'>{card.description}</div>
          </div>
          <div className='container__row'>
            { showForm === card.id ? (
              <button className='btn' onClick={handleCancelBtn}>
                Cancel
            </button>
            ) : (
              <button className='btn' onClick={() => handleEditBtn(card.id)}>
                Edit
              </button>
            )}
            <button className='btn' onClick={() => handleDeleteBtn(card.id)}>
              Delete
            </button>
          </div>
        </div>
        ))}
    </div>
  );

}

export default RenderCards;
