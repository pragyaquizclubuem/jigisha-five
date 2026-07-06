import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { certificateIssued } = await request.json();
    const { id } = await params;
    
    if (typeof certificateIssued !== 'boolean') {
      return NextResponse.json(
        { message: 'certificateIssued must be a boolean value' },
        { status: 400 }
      );
    }

    const updated = await prisma.janaOjanaRegistration.update({
      where: { id },
      data: { certificateIssued }
    });

    return NextResponse.json(
      { message: 'Certificate status updated successfully', certificateIssued: updated.certificateIssued },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating certificate status:', error);
    if (error.code === 'P2025') {
      return NextResponse.json(
        { message: 'Registration not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: 'Failed to update certificate status' },
      { status: 500 }
    );
  }
}
