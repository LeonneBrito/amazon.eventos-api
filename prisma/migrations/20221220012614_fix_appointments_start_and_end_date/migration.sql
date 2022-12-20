/*
  Warnings:

  - A unique constraint covering the columns `[start]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[end]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "appointments_start_key" ON "appointments"("start");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_end_key" ON "appointments"("end");
