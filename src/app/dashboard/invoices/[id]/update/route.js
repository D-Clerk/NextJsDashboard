import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request, { params }) {
  const { id } = params;

  try {
    const body = await request.json();
    const { amount, date, status } = body;

    // Validate fields if needed

    await sql`
      UPDATE invoices
      SET amount = ${Math.round(amount * 100)}, -- dollars to cents
          date = ${date},
          status = ${status}
      WHERE id = ${id};
    `;

    return NextResponse.json({ message: 'Invoice updated successfully' });
  } catch (error) {
    console.error('Failed to update invoice:', error);
    return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
  }
}
