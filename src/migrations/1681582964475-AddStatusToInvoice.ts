import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatusToInvoice1681582964475 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE invoice ADD status enum('Placed', 'Delivered', 'Cancelled')`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE invoice DROP COLUMN status`);
  }
}
