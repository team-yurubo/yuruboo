import React, { useState } from 'react';

const ProfilePage = () => {
  const [name, setName] = useState('John Doe');
  const [id, setId] = useState('12345');
  const [bio, setBio] = useState('Hello, I am John Doe.');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  return (
    <div>
      <h1>{name}</h1>
      <p>ID: {id}</p>
      <textarea value={bio} onChange={handleBioChange} />
      <button onClick={handleNameChange}>Change Name</button>
      <button onClick={handleIdChange}>Change ID</button>
    </div>
  );
};

export default ProfilePage;