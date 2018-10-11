import React from 'react';
import './AdoptedPets.css';

const AdoptedPets = ({adoptedPets, removePet, owner}) => {
  return (
    <div className='adoptedPets'>
      {adoptedPets.map((pet, idx) => (
        <div key={pet.id} className='petCard'>{pet.name}<button onClick={()=>removePet(owner, pet.name)}>x</button></div>
      ))}
    </div>
  )
}

export default AdoptedPets;