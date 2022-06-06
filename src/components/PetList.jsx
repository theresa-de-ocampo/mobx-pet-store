import React from "react";
import { observer } from "mobx-react-lite";

function PetList({store}) {
    const pets = store.pets.map(
        pet => (
            <tr key={pet.id}>
                <td>{pet.id}</td>
                <td>{pet.name}</td>
                <td>{pet.type}</td>
                <td>{pet.breed}</td>
                <td>
                    {
                        pet.owner ?
                        `${pet.owner.firstName} ${pet.owner.lastName}` :
                        "---"
                    }
                </td>
                <td>
                    <button onClick={() => handleEditPet(pet)}>Edit</button>
                </td>
                <td>
                    <button onClick={() => store.deletePet(pet.id)}>Delete</button>
                </td>
            </tr>
        )
    );

    function handleAddPet() {
        const name = prompt("Name of pet");
        const type = prompt("Type of pet");
        const breed = prompt("Breed of pet");
        const ownerId = prompt("Pet's owner ID");

        const pet = store.createPet({ id: Date.now(), name, type, breed });
        store.assignOwnerToPet(ownerId, pet.id);
    }

    function handleEditPet(pet) {
        pet.name = prompt("Name of pet");
        pet.type = prompt("Type of pet");
        pet.breed = prompt("Breed of pet");
        const ownerId = Number(prompt("Pet's owner ID"));
        store.updatePet(pet.id, pet);
        if (ownerId !== pet.owner?.id)
            store.assignOwnerToPet(ownerId, pet.id);
    }

    return (
        <div>
            {store.storeDetails}
            <h2>Pets</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Breed</th>
                        <th>Owner</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { pets }
                </tbody>
            </table>
            <button onClick={handleAddPet}>+ New Pet</button>
        </div>
    )
}

export default observer(PetList);