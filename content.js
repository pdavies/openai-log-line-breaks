function replaceSpanWithPre() {
  const spans = document.querySelectorAll('span');
  
  spans.forEach(span => {
    const parentDiv = span.parentElement?.parentElement?.parentElement?.parentElement;
    
    if (parentDiv) {
      const userSpan = parentDiv.querySelector('span');
      if (userSpan && userSpan.textContent?.trim() === 'user' && !parentDiv.querySelector('.mono-toggle')) {
        const pre = document.createElement('pre');
        pre.innerHTML = span.innerHTML;
        pre.style.whiteSpace = 'pre-wrap';
        pre.style.fontFamily = 'inherit';
        pre.style.fontSize = 'inherit';
        pre.style.margin = '0';
        pre.className = 'openai-log-content';
        
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Mono';
        toggleButton.className = 'mono-toggle';
        toggleButton.style.cssText = `
          margin-left: 8px;
          padding: 2px 6px;
          font-size: 11px;
          background: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 3px;
          cursor: pointer;
          color: #333;
        `;
        
        let isMonospace = false;
        toggleButton.addEventListener('click', () => {
          isMonospace = !isMonospace;
          pre.style.fontFamily = isMonospace ? 'monospace' : 'inherit';
          toggleButton.style.background = isMonospace ? '#007acc' : '#f0f0f0';
          toggleButton.style.color = isMonospace ? 'white' : '#333';
        });
        
        userSpan.appendChild(toggleButton);
        span.parentNode.replaceChild(pre, span);
      }
    }
  });
}

function observeChanges() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        setTimeout(replaceSpanWithPre, 100);
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    replaceSpanWithPre();
    observeChanges();
  });
} else {
  replaceSpanWithPre();
  observeChanges();
}