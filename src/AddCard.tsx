import './AddCard.css'
import { useState } from 'react'

const AddCard = () => {



  const renderAddButton = () => {
    return (
      <button onClick={
        () => {
          setHtmlForm(renderHtmlForm())
          setAddButton(null)
          }
      }>Add card</button>
    )
  }

  const [htmlForm, setHtmlForm] = useState<JSX.Element | null>(null);
  const [addButton, setAddButton] = useState<JSX.Element | null>(() => renderAddButton());
  let cardTitle = ''
  let cardImgLink = ''
  let cardDescription = ''

const renderHtmlForm = () => {
  return (
    <form className="add-item-form">
      <input placeholder="Title"
             onChange={(e) => cardTitle = e.target.value}
             />
        <input placeholder="Link to image http://..."
               onChange={(e) => cardImgLink = e.target.value}
               />
      <textarea className="add-item-form__description"
                placeholder="Description"
                onChange={(e) => cardDescription = e.target.value}
                />
      <div className='container__row'>
          <button className='btn' onClick={
            (e) => {      
              console.log(cardTitle, cardImgLink, cardDescription)    
              e.preventDefault();
              // renderCard();
              setHtmlForm(null);
              setAddButton(renderAddButton());
            }
          }>Add</button>
          <button className='btn' type='submit' onClick={
            (e) => {
              e.preventDefault();
              setHtmlForm(null);
              setAddButton(renderAddButton());
            }
          }>Cancel</button>
      </div>
  </form>
  )
}

  return (
    <div className='container__row'>
        {addButton}
        {htmlForm}
    </div>
  )
}

export default AddCard;