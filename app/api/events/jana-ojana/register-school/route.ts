import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Resend } from 'resend';
import { buildSchoolRegistrationEmail } from '@/lib/email-templates/registration';

const resend = new Resend(process.env.RESEND_API_KEY);

// Custom simple in-memory rate limiter
const ipRequestMap = new Map<string, { count: number; resetTime: number }>();
const LIMIT = 5; // requests
const WINDOW_MS = 60 * 1000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requestInfo = ipRequestMap.get(ip);

  if (!requestInfo || now > requestInfo.resetTime) {
    ipRequestMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return false;
  }

  requestInfo.count += 1;
  if (requestInfo.count > LIMIT) {
    return true;
  }
  return false;
}

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
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

  if (isRateLimited(ip)) {
    return NextResponse.json({ message: 'Too Many Requests' }, { status: 429 });
  }

  try {
    const formData = await request.formData();

    const contactName = formData.get('contactName') as string;
    const schoolName = formData.get('schoolName') as string;
    const mobileNumber = formData.get('mobileNumber') as string;
    const email = formData.get('email') as string;
    const studentsStr = formData.get('students') as string;
    const document = formData.get('document') as File;

    if (!contactName || !schoolName || !mobileNumber || !email || !studentsStr || !document) {
      return NextResponse.json({ message: 'All required fields must be filled.' }, { status: 400 });
    }

    let students: any[];
    try {
        students = JSON.parse(studentsStr);
        if (!Array.isArray(students) || students.length === 0) {
            throw new Error("Invalid students array");
        }
    } catch (e) {
        return NextResponse.json({ message: 'Invalid students data.' }, { status: 400 });
    }

    // Connect and upload to Cloudflare R2
    const { s3, r2BucketName, publicUrl } = getR2Client();
    const documentBuffer = Buffer.from(await document.arrayBuffer());
    const fileExtension = document.name.split('.').pop() || '';
    const documentKey = `school-docs/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: r2BucketName,
        Key: documentKey,
        Body: documentBuffer,
        ContentType: document.type,
      })
    );

    const documentUrl = `${publicUrl}/${documentKey}`;

    const result = await prisma.$transaction(async (tx) => {
        const schoolRegistration = await tx.janaOjanaSchoolRegistration.create({
            data: {
                contactName,
                schoolName,
                mobileNumber,
                email,
                documentUrl,
            }
        });

        const studentData = students.map((s) => ({
            studentName: s.name,
            schoolName: schoolName, // inheriting from school registration
            class: s.class,
            age: parseInt(s.age, 10),
            foodOption: s.foodOption,
            schoolRegistrationId: schoolRegistration.id,
        }));

        await tx.janaOjanaRegistration.createMany({
            data: studentData,
        });

        return schoolRegistration;
    },
    {
        maxWait: 15000, // default: 2000
        timeout: 20000, // default: 5000
    });

    try {
      await resend.emails.send({
        from: `${process.env.RESPONSE_SENDER_NAME} <${process.env.RESPONSE_SENDER_EMAIL}>`,
        to: [email],
        subject: "School Registration Confirmation - Jana Ojana",
        html: buildSchoolRegistrationEmail({
          contactName,
          schoolName,
          mobileNumber,
          students
        }),
      });
    } catch (emailError) {
      console.error('Failed to send school confirmation email:', emailError);
      // We don't fail the registration if email fails
    }

    return NextResponse.json(
      { message: 'School Registration successful!', data: { id: result.id } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('School Registration failed:', error);
    return NextResponse.json({ message: error.message || 'Registration failed.' }, { status: 500 });
  }
}
