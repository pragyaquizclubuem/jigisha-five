-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "JanaOjanaRegistration" (
    "id" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "altMobileNumber" TEXT,
    "class" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "idCardUrl" TEXT NOT NULL,
    "isAttended" BOOLEAN NOT NULL DEFAULT false,
    "certificateIssued" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JanaOjanaRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "JanaOjanaRegistration_studentName_schoolName_class_dob_idx" ON "JanaOjanaRegistration"("studentName", "schoolName", "class", "dob");

