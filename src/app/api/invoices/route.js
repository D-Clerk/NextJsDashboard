import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { createInvoice } from '../../lib/data';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';
  const ITEMS_PER_PAGE = 10;
  const page = Number(searchParams.get('page')) || 1;
  const offset = (page - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql`
      SELECT invoices.id, invoices.amount, invoices.date, invoices.status,
             customers.name, customers.email, customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE customers.name ILIKE ${`%${query}%`}
         OR customers.email ILIKE ${`%${query}%`}
         OR invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
    `;

    const countResult = await sql`
      SELECT COUNT(*) AS total
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE customers.name ILIKE ${`%${query}%`}
         OR customers.email ILIKE ${`%${query}%`}
         OR invoices.status ILIKE ${`%${query}%`};
    `;

    const total = Number(countResult.rows[0].total);
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    return NextResponse.json({ invoices: data.rows, totalPages });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    // Basic validation
    if (
      !data.customerId ||
      !data.amount ||
      !data.date ||
      !data.status
    ) {
      return NextResponse.json(
        { error: 'Missing required fields: customerId, amount, date, status' },
        { status: 400 }
      );
    }

    const newInvoice = await createInvoice({
      customerId: data.customerId,
      amount: data.amount,
      date: data.date,
      status: data.status,
    });

    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error) {
    console.error('API error creating invoice:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params }) {
  const id = params.id;
  const { customerId, amount, status } = await request.json();
  const amountInCents = Math.round(parseFloat(amount) * 100);

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId},
          amount = ${amountInCents},
          status = ${status}
      WHERE id = ${id};
    `;
    return new Response(JSON.stringify({ message: 'Updated' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to update invoice' }), { status: 500 });
  }
}