import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ registrations: [] });
    }

    const registrations = await prisma.janaOjanaRegistration.findMany({
      where: {
        OR: [
          { studentName: { contains: query, mode: 'insensitive' } },
          { schoolName: { contains: query, mode: 'insensitive' } },
          { mobileNumber: { contains: query, mode: 'insensitive' } },
          { altMobileNumber: { contains: query, mode: 'insensitive' } },
        ]
      },
      take: 50,
      select: {
        id: true,
        studentName: true,
        schoolName: true,
        class: true,
        mobileNumber: true,
        altMobileNumber: true,
        isAttended: true,
        idCardUrl: true,
      }
    });

    const formattedRegistrations = registrations.map(reg => ({
      _id: reg.id,
      studentName: reg.studentName,
      schoolName: reg.schoolName,
      class: reg.class,
      mobileNumber: reg.mobileNumber,
      altMobileNumber: reg.altMobileNumber || '',
      idCardUrl: reg.idCardUrl,
      isAttended: reg.isAttended,
    }));

    return NextResponse.json({ registrations: formattedRegistrations });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { message: 'Search failed' },
      { status: 500 }
    );
  }
}
