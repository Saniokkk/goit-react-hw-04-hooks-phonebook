import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Section } from 'components/Section';
import { ContactList } from 'components/Contacts';
import { ContactForm } from 'components/ContactForm';
import { addToStorage, getFromStorage } from './components/storage';

function App() {
  const [contactList, setContactList] = useState(getFromStorage('contactList') ? getFromStorage('contactList') : []);
  const [filter, setFilter] = useState('');

  useEffect(() => {addToStorage('contactList', contactList)}, [contactList]);
  
  const handleDeleteBtn = event => {    
      const contacts = Object.values(contactList);
      const currentId = event.target.closest('li').id;
      const newState = contacts.filter(({ id }) => {
        return id !== currentId;
      });
    return setContactList([...newState]);    
  };

  const changeStateAfterSubmit = (contactName, contactNumber) => {    
    if (contactList.find(contact => contact.name === contactName)) {
      alert(`${contactName} is already in contacts`);
    } else {
      return setContactList([...contactList, { name: contactName, number: contactNumber, id: nanoid() }]);
    }
  }
  
  const handleChange = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const contactListFilter = () => {  
    return contactList.filter(({ name }) => {
      return name.toLowerCase().includes(filter.toLowerCase().trim());
    });
  };
  
    return (
      <>
        <Section title="Phone book">
          <ContactForm stateApp={changeStateAfterSubmit} />
        </Section>
        <Section title="Contacts">
          <ContactList
            onChange={handleChange}
            handleBtn={handleDeleteBtn}
            filterContacts={contactList ? contactListFilter() : []}
            value={filter}
          />
        </Section>
      </>
    );
  }


export default App;
