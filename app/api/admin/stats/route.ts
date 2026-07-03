import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const registrations = await prisma.janaOjanaRegistration.findMany({
      select: {
        schoolName: true,
        class: true,
        isAttended: true,
        certificateIssued: true,
      }
    });

    const totalParticipants = registrations.length;

    // Get unique schools
    const uniqueSchools = new Set(registrations.map((r: any) => r.schoolName.trim().toLowerCase()));
    const totalSchools = uniqueSchools.size;

    // Get class counts
    const classCounts: { [key: string]: number } = {
      'VI': 0, 'VII': 0, 'VIII': 0, 'IX': 0, 'X': 0, 'XI': 0, 'XII': 0
    };
    registrations.forEach((r: any) => {
      if (classCounts[r.class] !== undefined) {
        classCounts[r.class]++;
      }
    });

    // Attendance stats
    const attended = registrations.filter((r: any) => r.isAttended).length;
    const notAttended = totalParticipants - attended;
    const attendanceRate = totalParticipants > 0 ? Math.round((attended / totalParticipants) * 100) : 0;

    // Certificate stats
    const issued = registrations.filter((r: any) => r.certificateIssued).length;
    const notIssued = totalParticipants - issued;
    const issuanceRate = totalParticipants > 0 ? Math.round((issued / totalParticipants) * 100) : 0;

    return NextResponse.json({
      totalSchools,
      totalParticipants,
      classCounts,
      attendanceStats: {
        attended,
        notAttended,
        attendanceRate,
      },
      certificateStats: {
        issued,
        notIssued,
        issuanceRate,
      }
    });
  } catch (error) {
    console.error('Failed to fetch admin stats:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
