import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const updateData = await request.json();
    const { id } = await params;
    
    // Validate required fields
    const { studentName, mobileNumber } = updateData;
    
    if (!studentName || !mobileNumber) {
      return NextResponse.json(
        { message: 'Student name and mobile number are required' },
        { status: 400 }
      );
    }

    // Validate mobile number format (should start with +91)
    if (!mobileNumber.startsWith('+91 ')) {
      return NextResponse.json(
        { message: 'Mobile number should start with +91' },
        { status: 400 }
      );
    }

    const data: any = {
      studentName,
      mobileNumber
    };

    if (updateData.altMobileNumber !== undefined) {
      data.altMobileNumber = updateData.altMobileNumber || null;
    }

    const updated = await prisma.janaOjanaRegistration.update({
      where: { id },
      data
    });

    return NextResponse.json(
      { message: 'Registration updated successfully', data: { id: updated.id } },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating registration:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { message: 'Registration not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Failed to update registration' },
      { status: 500 }
    );
  }
}
