import React from "react";
import { observer } from "mobx-react-lite";

function OwnerList({store}) {
    const owners = store.owners.map(
        owner => (
            <tr key={owner.id}>
                <td>{owner.id}</td>
                <td>{owner.firstName}</td>
                <td>{owner.lastName}</td>
                <td>
                    <button onClick={() => handleEditOwner(owner)}>Edit</button>
                </td>
                <td>
                    <button onClick={() => store.deleteOwner(owner.id)}>Delete</button>
                </td>
            </tr>
        )
    );

    function handleAddOwner() {
        const firstName = prompt("First Name");
        const lastName = prompt("Last Name");
        store.createOwner({id: Date.now(), firstName, lastName});
    }

    function handleEditOwner(owner) {
        owner.firstName = prompt("First Name");
        owner.lastName = prompt("Last Name");
        store.updateOwner(owner.id);
    }

    return (
        <>
            <h2>Owners</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {owners}
                </tbody>
            </table>
            <button onClick={handleAddOwner}>+ New Owner</button>
        </>
    )
}

export default observer(OwnerList);