import React, { useState, useEffect } from 'react';
import './Contacts.css';

function Contacts() {
    const [contact, setContact] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        category: ''
    });

    const [contacts, setContacts] = useState([]);

    const [editingContact, setEditingContact] = useState(null);

    // Function to allow for toggling between edit and edit a different contact
    const editContact = (index) => {
        if (editingContact === index) {
            setEditingContact(null);
        } else {
            setEditingContact(index);
        }
    };

    useEffect(() => {
        const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        setContacts(storedContacts);
    }, []);

    // Function to add a new contact
    const addContact = (event) => {
        event.preventDefault();
        
        // Create a new contact object from the input values
        const newContact = {
            name: event.target.name.value,
            address: event.target.address.value,
            phone: event.target.phone.value,
            email: event.target.email.value,
            category: event.target.category.value
        };
        
        // Add the new contact to the contacts state
        setContacts([...contacts, newContact]);
        
        // Clear the form fields
        setContact({
            name: '',
            address: '',
            phone: '',
            email: '',
            category: ''
        });
    };

    // Function to update an existing contact
    const updateContact = (event) => {
        event.preventDefault();
        
        // Create a copy of the contacts state
        const updatedContacts = [...contacts];
        
        // Update the contact at the editingContact index with the new values
        updatedContacts[editingContact] = {
            name: event.target.name.value,
            address: event.target.address.value,
            phone: event.target.phone.value,
            email: event.target.email.value,
            category: event.target.category.value
        };
        
        //Update the contacts state with the updated contacts
        setContacts(updatedContacts);
        
        // Reset the editingContact state
        setEditingContact(null);
        
        // Clear the form fields
        setContact({
            name: '',
            address: '',
            phone: '',
            email: '',
            category: ''
        });
    };

    const deleteContact = (index) => {
        // Create a new copy of the contacts state
        const updatedContacts = [...contacts];

        // Remove the contact at the specified index
        updatedContacts.splice(index, 1);

        // Update the contacts state
        setContacts(updatedContacts);
    };

    return (
        <div>
            <form onSubmit={editingContact !== null ? updateContact : addContact}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required value={contact.name} onChange={e => setContact({...contact, name: e.target.value})} />

                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" required value={contact.address} onChange={e => setContact({...contact, address: e.target.value})} />

                <label htmlFor="phone">Phone Number:</label>
                <input type="tel" id="phone" name="phone" required value={contact.phone} onChange={e => setContact({...contact, phone: e.target.value})} />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} />

                <label htmlFor="category">Category:</label>
                <select id="category" name="category" required value={contact.category} onChange={e => setContact({...contact, category: e.target.value})}>
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                </select>

                <button type="submit">{editingContact !== null ? 'Update Contact' : 'Add Contact'}</button>
            </form>
            <div id="contactList">
                {contacts.map((contact, index) => (
                    <div key={index} className="contact">
                        <h2>Name: {contact.name}</h2>
                        <p>Address: {contact.address}</p>
                        <p>Phone: {contact.phone}</p>
                        <p>Email: {contact.email}</p>
                        <p>Category: {contact.category}</p>
                        <button onClick={() => deleteContact(index)}>Delete</button>
                        <button onClick={() => editContact(index)}>{editingContact === index ? 'Cancel Edit' : 'Edit'}</button>
                    </div>
                ))}      
            </div>
            <button onClick={() => localStorage.clear()}>Clear Local Storage</button>
        </div>
    )
}

export default Contacts;