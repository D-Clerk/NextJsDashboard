import { sql } from '@vercel/postgres';

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    console.log('Received data:', data);
    console.log('Updating customer ID:', params.id);

    const { name, email } = data;

    await sql`
      UPDATE customers
      SET name = ${name}, email = ${email}
      WHERE id = ${params.id}
    `;

    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    console.error('Update failed:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
