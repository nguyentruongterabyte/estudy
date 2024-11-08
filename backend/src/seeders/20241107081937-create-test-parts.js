'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Parts', [
      { name: 'Mô tả tranh' },
      { name: 'Hỏi - Đáp' },
      { name: 'Đoạn hội thoại' },
      { name: 'Bài nói ngắn' },
      { name: 'Hoàn thành câu' },
      { name: 'Hoàn thành đoạn văn' },
      { name: 'Đọc hiểu' },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Parts', null, {});
  },
};
