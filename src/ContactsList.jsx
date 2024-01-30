
function ContactsList({ contacts }) {
    return (
        <div id="contactList">
                {contacts.map((contact, index) => (
                    <div key={index} className="contact">
                        <h2>Name: {contact.name}</h2>
                        <p>Address: {contact.address}</p>
                        <p>Phone: {contact.phone}</p>
                        <p>Email: {contact.email}</p>
                        <p>Category: {contact.category}</p>
                    </div>
                ))}      
            </div>
    );
}

export default ContactsList;