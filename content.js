function replaceSpanWithPre() {
  const spans = document.querySelectorAll('span');
  
  spans.forEach(span => {
    const parentDiv = span.parentElement?.parentElement?.parentElement?.parentElement;
    
    if (parentDiv) {
      const userSpan = parentDiv.querySelector('span');
      if (userSpan && userSpan.textContent?.trim() === 'user') {
        const pre = document.createElement('pre');
        pre.innerHTML = span.innerHTML;
        pre.style.whiteSpace = 'pre-wrap';
        pre.style.fontFamily = 'inherit';
        pre.style.fontSize = 'inherit';
        pre.style.margin = '0';
        
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