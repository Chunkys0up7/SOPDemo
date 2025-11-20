/**
 * Onboarding & Getting Started Guide
 * Simple first-time user guidance system
 */

(function() {
  'use strict';

  const ONBOARDING_KEY = 'sop_onboarding_complete';

  // Check if user has seen onboarding
  function hasSeenOnboarding() {
    return localStorage.getItem(ONBOARDING_KEY) === 'true';
  }

  // Mark onboarding as complete
  function completeOnboarding() {
    localStorage.setItem(ONBOARDING_KEY, 'true');
  }

  // Show onboarding modal
  function showOnboarding() {
    const modal = document.createElement('div');
    modal.id = 'onboarding-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.3s ease;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
      background: white;
      border-radius: 16px;
      padding: 40px;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: slideUp 0.4s ease;
    `;

    content.innerHTML = `
      <h1 style="color: #0052CC; margin-bottom: 16px; font-size: 28px;">
        👋 Welcome to the SOP Management System!
      </h1>

      <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
        This system helps you create, manage, and discover Standard Operating Procedures using atomic design principles.
      </p>

      <div style="margin: 24px 0;">
        <h3 style="color: #1a1a1a; margin-bottom: 12px; font-size: 18px;">🚀 Quick Start Guide</h3>

        <div style="background: #f0f7ff; padding: 16px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #0052CC;">
          <strong style="color: #0052CC;">📚 Browse SOPs</strong>
          <p style="color: #666; font-size: 14px; margin-top: 4px;">Discover all available procedures organized by department and type</p>
        </div>

        <div style="background: #f0f7ff; padding: 16px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #0052CC;">
          <strong style="color: #0052CC;">🔍 Search</strong>
          <p style="color: #666; font-size: 14px; margin-top: 4px;">Find procedures using keyword search or AI-powered graph search for related content</p>
        </div>

        <div style="background: #f0f7ff; padding: 16px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #0052CC;">
          <strong style="color: #0052CC;">➕ Create</strong>
          <p style="color: #666; font-size: 14px; margin-top: 4px;">Build new SOPs from scratch, templates, or compose from existing atoms</p>
        </div>

        <div style="background: #f0f7ff; padding: 16px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #0052CC;">
          <strong style="color: #0052CC;">📊 Graph</strong>
          <p style="color: #666; font-size: 14px; margin-top: 4px;">Visualize dependencies and relationships between procedures</p>
        </div>

        <div style="background: #f0f7ff; padding: 16px; border-radius: 8px; border-left: 4px solid #0052CC;">
          <strong style="color: #0052CC;">✏️ Workspace</strong>
          <p style="color: #666; font-size: 14px; margin-top: 4px;">Your personal editing environment for working on procedures</p>
        </div>
      </div>

      <div style="background: #fff3e0; padding: 16px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #f57c00;">
        <strong style="color: #f57c00;">💡 Pro Tip:</strong>
        <p style="color: #666; font-size: 14px; margin-top: 4px;">
          Hover over any navigation link to see tooltips explaining what each section does!
        </p>
      </div>

      <button id="onboarding-cta" style="
        width: 100%;
        padding: 16px;
        background: linear-gradient(135deg, #0052CC 0%, #003d99 100%);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s;
        margin-top: 8px;
      ">
        Get Started →
      </button>

      <p style="text-align: center; color: #999; font-size: 12px; margin-top: 16px;">
        You can always access help from the user menu in the top right
      </p>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // Add animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      #onboarding-cta:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 82, 204, 0.4);
      }
    `;
    document.head.appendChild(style);

    // Close on button click
    document.getElementById('onboarding-cta').addEventListener('click', function() {
      completeOnboarding();
      modal.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => modal.remove(), 300);
    });

    // Add fadeOut animation
    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = `
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(fadeOutStyle);
  }

  // Initialize onboarding
  function init() {
    // Only show on index/dashboard page
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/public/') {
      if (!hasSeenOnboarding()) {
        // Delay slightly to ensure page is loaded
        setTimeout(showOnboarding, 500);
      }
    }
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for manual control
  window.SOPOnboarding = {
    show: showOnboarding,
    reset: function() {
      localStorage.removeItem(ONBOARDING_KEY);
      showOnboarding();
    }
  };
})();
