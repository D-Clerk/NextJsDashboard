import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

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
