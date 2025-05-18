/*
  Warnings:

  - You are about to drop the column `vehicleId` on the `Motoboy` table. All the data in the column will be lost.
  - You are about to alter the column `plate` on the `Vehicle` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(7)`.
  - A unique constraint covering the columns `[plate]` on the table `Vehicle` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Motoboy" DROP CONSTRAINT "Motoboy_vehicleId_fkey";

-- DropIndex
DROP INDEX "Motoboy_vehicleId_key";

-- AlterTable
ALTER TABLE "Motoboy" DROP COLUMN "vehicleId";

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "motoboyId" INTEGER,
ALTER COLUMN "plate" SET DATA TYPE VARCHAR(7);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_plate_key" ON "Vehicle"("plate");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_motoboyId_fkey" FOREIGN KEY ("motoboyId") REFERENCES "Motoboy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
