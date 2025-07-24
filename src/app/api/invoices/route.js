import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { customerId, amount, status } = await req.json();

    if (!customerId || !amount || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Use current date for the invoice date field
    const now = new Date();

    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amount}, ${status}, ${now})
    `;

    return NextResponse.json({ message: 'Invoice created' }, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
