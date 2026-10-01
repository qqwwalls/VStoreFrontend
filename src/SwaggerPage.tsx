import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function SwaggerPage() {
  return (
    <div className="bg-white min-h-screen pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-black mb-6">API Documentation</h1>
        <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <SwaggerUI url="/swagger.json" />
        </div>
      </div>
    </div>
  );
}
