import React, { useState } from 'react';

export default function SignInModal({ open, onClose, onSignIn }) {
  const [name, setName] = useState('');

  if (!open) return null;
  function submit(e) {
    e.preventDefault();
    const demoToken = `demo-${Date.now()}`;
    const user = { name: name || 'Demo User' };
    localStorage.setItem('velora_token', demoToken);
    localStorage.setItem('velora_user', JSON.stringify(user));
    onSignIn(user);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
      <form onSubmit={submit} className="relative bg-black/90 surface p-6 rounded max-w-sm w-full z-10">
        <h3 className="text-lg font-semibold gold mb-2">Sign in (demo)</h3>
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" className="w-full p-3 surface mb-3" />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-3 py-2 muted">Cancel</button>
          <button type="submit" className="px-4 py-2 btn-gold">Sign In</button>
        </div>
      </form>
    </div>
  );
}