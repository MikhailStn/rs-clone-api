const { Schema, model } = require("mongoose");

const User = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  role: { type: String, require: true },
  pets: [
    {
      petId: { type: String },
      name: { type: String },
      type: { type: String },
      gender: { type: String },
      breed: { type: String },
      size: { type: String },
      age: { type: String },
      avatarPath: { type: String },
      about: { type: String },
      other: {
        neutered: { type: String },
        isAlone: { type: String },
        isMotionSickness: { type: String },
        takesMedication: { type: String },
        isAgressive: { type: String },
        isExcitable: { type: String },
        isTimid: { type: String },
        tendsToRunAway: { type: String },
        hasVaccinationBoolket: { type: String },
        withYellowRibbon: { type: String },
        inMidstOfHeat: { type: String },
        isDefecatesAtHome: { type: String },
      },
    },
  ],
  avatarPath: { type: String },
  petsitterData: {
    birth: { type: String },
    gender: { type: String },
    services: {
      servicesArr: { type: Array },
      hotel: {
        active: { type: String },
        animals: { type: Array },
        price: { type: String },
      },
      walking: {
        active: { type: String },
        serviceArea: { type: String },
        kindOfDogs: { type: Array },
        ageOfDogs: { type: Array },
        genderOfDogs: { type: Array },
        price: { type: String },
      },
      homevisits: {
        active: { type: String },
        serviceArea: { type: String },
        animals: { type: Array },
        price: { type: String },
      },
      training: {
        active: { type: String },
        price: { type: String },
      },
    },
    address: { type: String },
    aboutMe: { type: String },
    carers: { type: String },
    skills: { type: String },
    typeOfHome: { type: String },
    qualifications: { type: Array },
    homeConditions: { type: Array },
    tenatsAtHome: { type: Array },
    otherAnimals: { type: Array },
    level: { type: String },
    rate: { type: String },
    availableDates: { type: Array },
    prices: { type: Array },
    reviews: { type: Array },
    orders: [
      {
        numberOfOrder: { type: String },
        petsitterId: { type: String },
        ownerId: { type: String },
        /* chat: {
          roomId: { type: String },
          messages: [
            {
              avatarPath: { type: String },
              name: { type: String },
              message: { type: String }
            }
          ]
        }, */
        messages: [
          {
            avatarPath: { type: String },
            name: { type: String },
            message: { type: String }
          }
        ]
      }
    ]
  },
});

module.exports = model("User", User);
