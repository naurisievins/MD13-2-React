import { useState } from 'react'
import './AddCard.css'

type HandleAddType = {
  handleAddBtn: (title: string,
                 description: string,
                 image: string
                ) => void
}

const AddCard = ({handleAddBtn} :HandleAddType) => {

  const renderAddButton = () => {
    return (
      <button onClick={
        () => {
          setHtmlForm(renderHtmlForm())
          setAddButton(null)
          }
      }>
        Add card
      </button>
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
              e.preventDefault();
              setHtmlForm(null);
              setAddButton(renderAddButton());
              handleAddBtn(cardTitle, cardDescription, cardImgLink);
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