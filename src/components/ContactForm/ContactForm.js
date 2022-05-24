import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/Button';
import style from './ContactForm.module.css';

export function ContactForm(props){
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    props.stateApp(name, number);
    setName('');
    setNumber('');
  };

  const handleChange = event => {
    if (event.target.name === 'name') {
      setName(event.target.value)
    }
    if (event.target.name === 'number') {
      setNumber(event.target.value)
    }
  };
  
    return (
      <form className={style.form} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
        <label htmlFor="number">Number</label>
        <input
          type="tel"
          name="number"
          id="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
        <Button
          type="submit"
          className={style.formBtn}
          name="Add contact"
          onClick={handleChange}
        />
      </form>
    );
  }
ContactForm.propTypes = {
  stateApp: PropTypes.func.isRequired,
}