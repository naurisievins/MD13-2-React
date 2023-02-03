import { useState, useEffect, useLayoutEffect } from 'react'
import axios from 'axios';
import './RenderCards.css'
import AddCard from './AddCard';
import { v4 as uuidv4 } from 'uuid';

const RenderCards = () => {

  type Fruits = {
    id: string
    title?: string | undefined
    description?: string | undefined
    image?: string | undefined
  }

  const url = 'http://localhost:3004/fruits/';

  const [cardData, setCardData] = useState<Fruits[]>([]);
  const [showForm, setShowForm] = useState<string | null>(null);
  const [editFormTitle, setEditFormTitle] = useState<string>();
  const [editFormImage, setEditFormImage] = useState<string>();
  const [editFormDescription, setEditFormDescription] = useState<string>();
  const [loading, setLoading] = useState(true);

 
 useEffect(() => {
  axios.get(url).then((response) => {
    setCardData(response.data);
    console.log(cardData);
    setLoading(false);
   })
 }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  const handleDeleteBtn = (id: string) => {
    if (Number(id) === 1 ||
    Number(id) === 2 ||
    Number(id) === 3 ||
    Number(id) === 4 ||
    Number(id) === 5) {
      alert('You can\'t edit or delete this card!')
      return
    }
    setLoading(true)
    axios.delete(`${url}${id}`)
    .then(() => setLoading(false));
    const deleteIndex = cardData.findIndex(card => card.id === id);
    const newData = cardData.filter((_, index) => index !== deleteIndex);
    setCardData(newData);
  }

  const handleEditBtn = (id: string) => {
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
    setShowForm(null);
    if (Number(showForm) === 1 ||
        Number(showForm) === 2 ||
        Number(showForm) === 3 ||
        Number(showForm) === 4 ||
        Number(showForm) === 5) {
      alert('You can\'t edit or delete this card!')
      return
    }
    axios.patch(`${url}${showForm}`, { title: editFormTitle,
                                       image: editFormImage,
                                       description: editFormDescription
                                      })
    setCardData(prevCardData =>
      prevCardData.map((item) => {
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

  const handleAddBtn = (title: string, description: string, image: string) => {
    setLoading(true)
    const newCard: Fruits = {
      id: uuidv4(),
      title,
      description,
      image
    }
    axios.post(url, newCard)
    .then(() => {
      setCardData([...cardData, newCard]);
      setLoading(false)
    });
  }

  return (
    <>
      <AddCard handleAddBtn={(title, description, image) => handleAddBtn(title, description, image)}/>
      <div className='container__row'>
        {cardData.map((card) => (
          <div className='card' key={card.id}>
            <div className='container__row'>
            { showForm === card.id && (
              <form className="container__form">
                <input className="edit__title" placeholder='Title' value={editFormTitle} onChange={e => setEditFormTitle(e.target.value)}  />
                <textarea className="edit__description" placeholder="Description" value={editFormDescription} onChange={e => setEditFormDescription(e.target.value)} />
                <input className="edit__img" placeholder="New image link" value={editFormImage} onChange={e => setEditFormImage(e.target.value)} />
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
    </>
  );

}

export default RenderCards;
