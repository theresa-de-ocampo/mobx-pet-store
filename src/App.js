import React from "react";
import PetOwner from "./PetOwner";
import PetList from "./components/PetList";

export default function App() {
    const store = new PetOwner();

    const teriz = store.createOwner({
        id: 1,
        firstName: "Teriz",
        lastName: "De Ocampo"
    });

    store.createOwner({
        id: 2,
        firstName: "Eris Jericho",
        lastName: "Lacsamana"
    });

    store.createPet({
        id: 1,
        name: "Athena",
        type: "Dog",
        breed: "Mini Pinscher",
        owner: teriz
    });

    store.createPet({
        id: 2,
        name: "Rustie",
        type: "Dog",
        breed: "Labrador"
    });
    
    return (
        <>
            <PetList store={store} />
        </>
    )
}
