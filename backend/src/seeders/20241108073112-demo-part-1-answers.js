'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Answers', [
      // Question 1
      {
        questionId: 1,
        answer: 'The man is holding some seafood.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 1,
        answer: 'The woman is baking a crab.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 1,
        answer: 'They are scared of the crab.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 1,
        answer: 'The family is shopping for breakfast.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 2
      {
        questionId: 2,
        answer: 'The woman is talking on the phone.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 2,
        answer: 'The woman is using her cell phone.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 2,
        answer: 'The woman is typing on the laptop.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 2,
        answer: 'The woman is writing in her notebook.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 3
      {
        questionId: 3,
        answer: 'The man is using a screwdriver to screw a nail into the building frame.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 3,
        answer: 'The man is hammering something into a building frame.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 3,
        answer: 'The man is making the frame with his hand.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 3,
        answer: 'The man is wearing protective glasses.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 4
      {
        questionId: 4,
        answer: 'The woman is cooking some bacon.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 4,
        answer: 'The woman is baking a cake.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 4,
        answer: 'The woman is preparing for dinner.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 4,
        answer: 'The woman is frying some fish.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 5
      {
        questionId: 5,
        answer: 'They are looking at each other.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 5,
        answer: 'The woman is typing on her computer.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 5,
        answer: 'The man is using the calculator.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 5,
        answer: 'The man is writing something onto the notepad.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Question 6
      {
        questionId: 6,
        answer: 'There are some tables and chairs outdoors.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 6,
        answer: 'There are some people sitting at the tables.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 6,
        answer: 'There are plastic umbrellas on the tables.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        questionId: 6,
        answer: 'There are many flowers in the garden.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
