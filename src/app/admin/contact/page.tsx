'use client';

import { useEffect, useState } from 'react';

interface Contact {
  id: number;
  name: string;
  email: string;
  service: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function ContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    const res = await fetch('/api/contact');
    const data = await res.json();
    setContacts(Array.isArray(data) ? data : []);
  }

  async function toggleRead(id: number, currentStatus: boolean) {
    await fetch('/api/contact', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, is_read: !currentStatus }),
    });
    fetchContacts();
  }

  async function handleDelete(id: number) {
    if (confirm('Delete this message?')) {
      await fetch(`/api/contact?id=${id}`, { method: 'DELETE' });
      fetchContacts();
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold font-['Playfair_Display']">Contact Messages</h1>
          <p className="text-gray-400 mt-2">{contacts.length} messages</p>
        </div>
      </div>

      <div className="space-y-4">
        {contacts.length === 0 ? (
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 text-center">
            <p className="text-gray-400">No messages yet</p>
          </div>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className={`bg-[#0a0a0a] border rounded-3xl p-6 ${contact.is_read ? 'border-white/10' : 'border-[#C9A84C]/30'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold">{contact.name}</h3>
                    {!contact.is_read && (
                      <span className="bg-[#C9A84C] text-black text-xs font-bold px-2 py-0.5 rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{contact.email}</p>
                </div>
                <div className="text-gray-500 text-sm">
                  {new Date(contact.created_at).toLocaleDateString()}
                </div>
              </div>

              {contact.service && (
                <div className="mb-3">
                  <span className="text-[#C9A84C] text-sm">Service: </span>
                  <span className="text-gray-300 text-sm">{contact.service}</span>
                </div>
              )}

              {contact.message && (
                <p className="text-gray-300 mb-4 whitespace-pre-wrap">{contact.message}</p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => toggleRead(contact.id, contact.is_read)}
                  className="px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors"
                >
                  {contact.is_read ? 'Mark Unread' : 'Mark Read'}
                </button>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
