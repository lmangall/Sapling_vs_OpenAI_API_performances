import React, { useEffect } from 'react';
import { Sapling } from "@saplingai/sapling-js/observer";

function SaplingEditor() {
  useEffect(() => {
    // Sapling initialization within useEffect
    Sapling.init({
      key: process.env.NEXT_PUBLIC_SAPLING_API_KEY,
      endpointHostname: 'https://api.sapling.ai',
      editPathname: '/api/v1/edits',
      statusBadge: true,
      mode: 'prod',
    });

    // Access and observe editor element
    const editor = document.getElementById('sapling-editor');
    if (editor) {
      Sapling.observe(editor);
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
