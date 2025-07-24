import { sql } from '@vercel/postgres';

export async function PUT(request, { params }) {
  try {
    const { customerId, amount, status } = await request.json();

    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amount * 100}, status = ${status}
      WHERE id = ${params.id}
    `;

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update invoice' }), {
      status: 500,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${params.id}`;

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete invoice' }), {
      status: 500,
    });
  }
}
