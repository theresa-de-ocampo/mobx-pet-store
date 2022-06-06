import {
    makeObservable,
    observable,
    computed,
    action,
    autorun
} from "mobx";

export default class PetOwner {
    pets = [];
    owners = [];

    constructor() {
        makeObservable(this, {
            pets: observable,
            owners: observable,
            totalPets: computed,
            totalOwners: computed,
            storeDetails: computed,
            getPetsByOwner: action,
            createPet: action,
            createOwner: action,
            updatePet: action,
            updateOwner: action,
            deletePet: action,
            deleteOwner: action,
            assignOwnerToPet: action
        });
        autorun(this.logStoreDetails);
    }

    createPet(pet = {id: 0, name: "", type: "", breed: "", owner: null}) {
        this.pets.push(pet);
        return pet;
    }

    createOwner(owner = {id: 0, firstName: "", lastName: ""}) {
        this.owners.push(owner);
        return owner;
    }

    updateOwner(ownerId, update) {
        const ownerIndexAtId = this.owners.findIndex(owner => owner.id === ownerId);
        if (ownerIndexAtId > -1 && update)
            this.owners[ownerIndexAtId] = update;
    }

    updatePet(petId, update) {
        const petIndexAtId = this.pets.findIndex(pet => pet.id === petId);
        if (petIndexAtId > -1 && update)
            this.pets[petIndexAtId] = update;
    }

    deleteOwner(ownerId) {
        const ownerIndexAtId = this.owners.findIndex(owner => owner.id === ownerId);
        if (ownerIndexAtId > -1)
            this.owners.splice(ownerIndexAtId, 1);
    }

    deletePet(petId) {
        const petIndexAtId = this.pets.findIndex(pet => pet.id === petId);
        if (petIndexAtId > -1)
            this.pets.splice(petIndexAtId, 1);
    }

    get totalOwners() {
        return this.owners.length;
    }

    get totalPets() {
        return this.pets.length;
    }

    getPetsByOwner(ownerId) {
        return this.pets.filter(pet => pet.owner && pet.owner.id === ownerId)
    }

    assignOwnerToPet(ownerId, petId) {
        const petIndexAtId = this.pets.findIndex(pet => pet.id === petId);
        const ownerIndexAtId = this.owners.findIndex(owner => owner.id === ownerId);
        if (petIndexAtId > -1 && ownerIndexAtId > -1) 
            this.pets[petIndexAtId].owner = this.owners[ownerIndexAtId];
    }

    get storeDetails() {
        return `We have a total of ${this.totalPets} pets, and ${this.totalOwners} owners.`;
    }

    logStoreDetails = () => {
        console.log(this.storeDetails);
    }
}