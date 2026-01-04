import React from 'react';
import ProjectCard from './ProjectCard';

const OutputItem = ({ data }) => {
  
  // 1. If it's the user's command
  if (data.type === 'command') {
    return (
      <div className="mb-2">
        <span className="text-pink-500 font-bold mr-2">visitor@portfolio:~$</span>
        <span className="text-gray-200">{data.content}</span>
      </div>
    );
  }

  // 2. If it's an Error
  if (data.type === 'error') {
    return <div className="text-red-400 mb-4 ml-4">✖ {data.content}</div>;
  }

  // 3. If it's a List (e.g., Skills)
  if (data.type === 'list') {
    return (
      <div className="flex flex-wrap gap-2 mb-4 ml-4">
        {data.content.map((item, index) => (
          <span key={index} className="px-3 py-1 bg-gray-800 text-cyan-300 rounded text-xs font-mono border border-gray-700">
            {item}
          </span>
        ))}
      </div>
    );
  }

  // 4. If it's "Cards" (Projects - The Best UI Part)
  if (data.type === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 ml-4 mt-2">
        {data.content.map((proj, index) => (
          <ProjectCard key={index} project={proj} />
        ))}
      </div>
    );
  }

  // 5. Default Text
  return (
    <div className="text-green-400 mb-4 ml-4 whitespace-pre-wrap leading-relaxed">
      {data.content}
    </div>
  );
};

export default OutputItem;