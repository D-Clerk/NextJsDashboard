import { sql } from '@vercel/postgres';

export async function PUT(request, { params }) {
  const { name, email } = await request.json();

  await sql`
    UPDATE customers
    SET name = ${name}, email = ${email}
    WHERE id = ${params.id}
  `;

  return new Response(JSON.stringify({ success: true }));
}
