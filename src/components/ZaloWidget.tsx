'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function ZaloWidget() {
  useEffect(() => {
    // Create the Zalo widget container outside React's control
    const existingWidget = document.getElementById('zalo-widget-container');
    if (existingWidget) return;

    const container = document.createElement('div');
    container.id = 'zalo-widget-container';
    
    const widget = document.createElement('div');
    widget.className = 'zalo-chat-widget';
    widget.setAttribute('data-oaid', '909292983362405342');
    widget.setAttribute('data-welcome-message', 'Rất vui khi được hỗ trợ bạn!');
    widget.setAttribute('data-autopopup', '0');
    widget.setAttribute('data-width', '');
    widget.setAttribute('data-height', '');
    
    container.appendChild(widget);
    document.body.appendChild(container);

    return () => {
      // Cleanup on unmount
      const containerToRemove = document.getElementById('zalo-widget-container');
      if (containerToRemove) {
        containerToRemove.remove();
      }
    };
  }, []);

  return (
    <Script 
      src="https://sp.zalo.me/plugins/sdk.js" 
      strategy="lazyOnload"
    />
  );
}
