import React, { useEffect } from 'react';
import { Sapling } from "@saplingai/sapling-js/observer";

function SaplingEditor() {
  useEffect(() => {
    // Ensure code runs only in the browser where 'document' is defined
    if (typeof window !== 'undefined') {
      Sapling.init({
        key: process.env.NEXT_PUBLIC_SAPLING_API_KEY, // Replace with your API key
        endpointHostname: 'https://api.sapling.ai',
        editPathname: '/api/v1/edits',
        statusBadge: true,
        mode: 'prod',
        lang: "fr",
      });

      const editor = document.getElementById('sapling-editor');
      if (editor) {
        Sapling.observe(editor);
      }
    }
  }, []);

  return (
    <div
      id="sapling-editor"
      sapling-ignore="true"
      contentEditable="true"
      className="w-[500px] p-4 text-base font-normal border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none resize: none h-40"
      placeholder="Start typing here to correct with Sapling..."
    />
  );
}

export default SaplingEditor;
