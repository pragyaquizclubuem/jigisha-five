import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';
  const classFilter = searchParams.get('class') || '';
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = searchParams.get('sortOrder') || 'desc';
  const isAttended = searchParams.get('isAttended');
  const certificateIssued = searchParams.get('certificateIssued');

  try {
    // Build query filter
    const where: Prisma.JanaOjanaRegistrationWhereInput = {};
    
    // Add search filter
    if (search) {
      where.OR = [
        { studentName: { contains: search, mode: 'insensitive' } },
        { schoolName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Add class filter
    if (classFilter) {
      where.class = classFilter;
    }

    // Add attendance filter
    if (isAttended === 'true' || isAttended === 'false') {
      where.isAttended = isAttended === 'true';
    }

    // Add certificate filter
    if (certificateIssued === 'true' || certificateIssued === 'false') {
      where.certificateIssued = certificateIssued === 'true';
    }

    // Build sort options
    const allowedSortFields = ['studentName', 'schoolName', 'class', 'createdAt', 'email'] as const;
    type SortField = typeof allowedSortFields[number];
    const direction = sortOrder === 'asc' ? 'asc' : ('desc' as const);
    const orderBy: Prisma.JanaOjanaRegistrationOrderByWithRelationInput = allowedSortFields.includes(sortBy as SortField)
      ? { [sortBy as SortField]: direction }
      : { createdAt: 'desc' };

    // Get total count for pagination
    const total = await prisma.janaOjanaRegistration.count({ where });
    const totalPages = Math.ceil(total / limit);

    // Get paginated results
    const skip = (page - 1) * limit;
    const registrations = await prisma.janaOjanaRegistration.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      select: {
        id: true,
        studentName: true,
        schoolName: true,
        class: true,
        dob: true,
        email: true,
        mobileNumber: true,
        altMobileNumber: true,
        createdAt: true,
        isAttended: true,
        certificateIssued: true,
        idCardUrl: true,
      }
    });

    // Format the response matching MongoDB expected output
    const formattedRegistrations = registrations.map(reg => ({
      _id: reg.id,
      studentName: reg.studentName,
      schoolName: reg.schoolName,
      class: reg.class,
      dob: reg.dob.toISOString(),
      email: reg.email,
      mobileNumber: reg.mobileNumber,
      altMobileNumber: reg.altMobileNumber || '',
      idCardUrl: reg.idCardUrl,
      createdAt: reg.createdAt.toISOString(),
      isAttended: reg.isAttended,
      certificateIssued: reg.certificateIssued
    }));

    return NextResponse.json({
      registrations: formattedRegistrations,
      total,
      page,
      totalPages,
      limit
    });

  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json({ message: 'Error fetching registrations' }, { status: 500 });
  }
}
