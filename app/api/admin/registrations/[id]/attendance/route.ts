import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { isAttended } = await request.json();
    const { id } = await params;
    
    if (typeof isAttended !== 'boolean') {
      return NextResponse.json(
        { message: 'isAttended must be a boolean value' },
        { status: 400 }
      );
    }

    const updated = await prisma.janaOjanaRegistration.update({
      where: { id },
      data: { isAttended }
    });

    return NextResponse.json(
      { message: 'Attendance status updated successfully', isAttended: updated.isAttended },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating attendance status:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { message: 'Registration not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Failed to update attendance status' },
      { status: 500 }
    );
  }
}
