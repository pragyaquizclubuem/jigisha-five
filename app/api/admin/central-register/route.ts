import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

function getR2Client() {
  const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
  const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
  
  const s3Api = process.env.S3_API || '';
  const publicUrl = process.env.R2_PUBLIC_DEVELOPMENT_URL || process.env.PUBLIC_CLOUDFLARE_R2_URL;

  let r2AccountId = process.env.R2_ACCOUNT_ID;
  let r2BucketName = process.env.R2_BUCKET_NAME;

  if (s3Api) {
    const cleanS3Api = s3Api.trim();
    const match = cleanS3Api.match(/https:\/\/([a-z0-9]+)\.r2\.cloudflarestorage\.com\/(.+)/i);
    if (match) {
      r2AccountId = match[1];
      r2BucketName = match[2];
    }
  }

  if (!r2AccountId || !r2AccessKeyId || !r2SecretAccessKey || !r2BucketName || !publicUrl) {
    throw new Error(
      `Cloudflare R2 configuration is incomplete. Please ensure you have added R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY to your .env file.`
    );
  }

  const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${r2AccountId.trim()}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: r2AccessKeyId.trim(),
      secretAccessKey: r2SecretAccessKey.trim(),
    },
  });

  return { s3, r2BucketName: r2BucketName.trim(), publicUrl: publicUrl.trim() };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const idCard = formData.get('idCard') as File | null;

    const studentName = formData.get('studentName') as string;
    const schoolName = formData.get('schoolName') as string;
    const mobileNumber = formData.get('mobileNumber') as string;
    const altMobileNumber = formData.get('altMobileNumber') as string;
    const classVal = formData.get('class') as string;
    const dobStr = formData.get('dob') as string;
    const email = formData.get('email') as string;
    const foodOption = (formData.get('foodOption') as string) || 'VEG';

    if (!studentName || !schoolName || !mobileNumber || !classVal || !dobStr || !email) {
      return NextResponse.json({ message: 'All required fields must be filled.' }, { status: 400 });
    }

    const dob = new Date(dobStr);
    if (isNaN(dob.getTime())) {
      return NextResponse.json({ message: 'Invalid Date of Birth.' }, { status: 400 });
    }

    const existingEntry = await prisma.janaOjanaRegistration.findFirst({
      where: {
        studentName,
        schoolName,
        class: classVal,
        dob,
      },
    });

    if (existingEntry) {
      return NextResponse.json(
        { message: 'This entry seems to be a duplicate. Please contact the co-ordinators.' },
        { status: 409 }
      );
    }

    let idCardUrl = '';

    if (idCard) {
      const { s3, r2BucketName, publicUrl } = getR2Client();
      const idCardBuffer = Buffer.from(await idCard.arrayBuffer());
      const fileExtension = idCard.name.split('.').pop() || '';
      const idCardKey = `id-cards/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: r2BucketName,
          Key: idCardKey,
          Body: idCardBuffer,
          ContentType: idCard.type,
        })
      );

      idCardUrl = `${publicUrl}/${idCardKey}`;
    }

    const result = await prisma.janaOjanaRegistration.create({
      data: {
        studentName,
        schoolName,
        mobileNumber,
        altMobileNumber: altMobileNumber || null,
        class: classVal,
        dob,
        email,
        idCardUrl,
        isAttended: true, // Always true for central registration
        certificateIssued: false,
        foodOption
      },
    });

    return NextResponse.json(
      { message: 'Registration successful! Participant marked as attended.', data: { id: result.id } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration failed:', error);
    return NextResponse.json({ message: error.message || 'Registration failed.' }, { status: 500 });
  }
}
