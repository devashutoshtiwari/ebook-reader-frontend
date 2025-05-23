// src/components/ui/Toast.js
'use client';

import React, { useEffect } from 'react';

// Create a global toast container in the DOM
const createToastContainer = () => {
  if (typeof document === 'undefined') return null;
  
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(container);
  }
  return container;
};

// Show a toast notification
export const showToast = (message, type = 'primary') => {
  if (typeof document === 'undefined') return;
  
  const container = createToastContainer();
  if (!container) return;
  
  // Create toast element
  const toastEl = document.createElement('div');
  toastEl.className = `toast align-items-center text-white bg-${type} border-0`;
  toastEl.setAttribute('role', 'alert');
  toastEl.setAttribute('aria-live', 'assertive');
  toastEl.setAttribute('aria-atomic', 'true');
  
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        ${message}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
  
  container.appendChild(toastEl);
  
  // Initialize and show the toast
  const toast = new bootstrap.Toast(toastEl, {
    animation: true,
    autohide: true,
    delay: 3000
  });
  
  toast.show();
  
  // Remove the toast element after it's hidden
  toastEl.addEventListener('hidden.bs.toast', function () {
    toastEl.remove();
  });
};

// Component for use within React
const Toast = ({ message, type = 'primary', show = false, onHide }) => {
  useEffect(() => {
    if (show) {
      showToast(message, type);
      if (onHide) onHide();
    }
  }, [show, message, type, onHide]);
  
  return null;
};

export default Toast;